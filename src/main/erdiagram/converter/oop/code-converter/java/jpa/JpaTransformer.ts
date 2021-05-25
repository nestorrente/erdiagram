import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/code-converter/java/model/transformer/JavaClassModelTransformer';
import {
	JavaClassModelTransformContext,
	JavaClassTransformContext,
	JavaFieldTransformContext,
	SetupContext
} from '@/erdiagram/converter/oop/code-converter/java/model/transformer/java-class-model-transformer-context-types';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import JpaTransformerConfig from '@/erdiagram/converter/oop/code-converter/java/jpa/config/JpaTransformerConfig';
import jpaTransformerConfigManager
	from '@/erdiagram/converter/oop/code-converter/java/jpa/config/JpaTransformerConfigManager';
import {
	JavaClass,
	JavaClassModel,
	JavaField
} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import {DatabaseModel, TableDescriptor} from '@/erdiagram/converter/database/model/database-model-types';
import createJavaSimpleType from '@/erdiagram/converter/oop/code-converter/java/type/simple/createJavaSimpleType';
import JavaAnnotation from '@/erdiagram/converter/oop/code-converter/java/annotation/JavaAnnotation';
import {
	isEntityIdentitySourceMetadata,
	isEntityPropertySourceMetadata,
	isEntitySourceMetadata,
	isRelationshipTargetSourceMetadata
} from '@/erdiagram/converter/oop/model/source-metadata-utils';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import {
	Cardinality,
	Direction,
	EntityDescriptor,
	RelationshipDescriptor,
	RelationshipMember
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {ClassFieldDescriptor, ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';

export interface JpaTransformerSetupData {
	databaseModel: DatabaseModel;
}

const JPA_PACKAGE = 'javax.persistence';

const JpaAnnotationTypes = {
	Entity: createJavaSimpleType('Entity', JPA_PACKAGE),
	Table: createJavaSimpleType('Table', JPA_PACKAGE),
	Column: createJavaSimpleType('Column', JPA_PACKAGE),
	Id: createJavaSimpleType('Id', JPA_PACKAGE),
	GeneratedValue: createJavaSimpleType('GeneratedValue', JPA_PACKAGE),
	OneToOne: createJavaSimpleType('OneToOne', JPA_PACKAGE),
	OneToMany: createJavaSimpleType('OneToMany', JPA_PACKAGE),
	ManyToOne: createJavaSimpleType('ManyToOne', JPA_PACKAGE),
	ManyToMany: createJavaSimpleType('ManyToMany', JPA_PACKAGE),
	JoinTable: createJavaSimpleType('JoinTable', JPA_PACKAGE),
	JoinColumn: createJavaSimpleType('JoinColumn', JPA_PACKAGE),
	JoinColumns: createJavaSimpleType('JoinColumns', JPA_PACKAGE),
};

const JpaEnumTypes = {
	GenerationType: createJavaSimpleType('GenerationType', JPA_PACKAGE),
};

export class JpaTransformer implements JavaClassModelTransformer<JpaTransformerSetupData> {

	readonly #databaseModelGenerator: DatabaseModelGenerator;

	readonly #tableNameCaseConverter: CaseConverter;
	readonly #columnNameCaseConverter: CaseConverter;
	readonly #annotateGetters: boolean;

	constructor(databaseModelGenerator: DatabaseModelGenerator, config?: Partial<JpaTransformerConfig>) {

		this.#databaseModelGenerator = databaseModelGenerator;

		const {
			tableNameCaseFormat,
			columnNameCaseFormat,
			annotateGetters
		} = jpaTransformerConfigManager.mergeWithDefaultConfig(config);

		this.#tableNameCaseConverter = new CaseConverter(StandardCaseFormats.UPPER_CAMEL, tableNameCaseFormat);
		this.#columnNameCaseConverter = new CaseConverter(StandardCaseFormats.UPPER_CAMEL, columnNameCaseFormat);

		this.#annotateGetters = annotateGetters;

	}

	setup(context: SetupContext): JpaTransformerSetupData {
		return {
			databaseModel: this.#databaseModelGenerator.generateDatabaseModel(context.entityRelationshipModel)
		};
	}

	visitField(javaField: JavaField, context: JavaFieldTransformContext<JpaTransformerSetupData>): void {

		const jpaAnnotations = this.getEntityPropertyAnnotations(context.fieldDescriptor, context.classModel, context.setupData.databaseModel);

		if (this.#annotateGetters && javaField.getter != null) {
			javaField.getter.annotations.push(...jpaAnnotations);
		} else {
			javaField.annotations.push(...jpaAnnotations);
		}

	}

	private getEntityPropertyAnnotations(fieldDescriptor: ClassFieldDescriptor, classModel: ClassModel, databaseModel: DatabaseModel): JavaAnnotation[] {

		const {sourceMetadata} = fieldDescriptor;

		if (isEntityIdentitySourceMetadata(sourceMetadata)) {

			return [
				new JavaAnnotation(JpaAnnotationTypes.Id),
				new JavaAnnotation(JpaAnnotationTypes.GeneratedValue, {
					// FIXME allow configuring the generation type (if IDENTITY is not valid for all scenarios)
					strategy: JavaAnnotation.createRawParameterValue('GenerationType.IDENTITY', JpaEnumTypes.GenerationType)
				}),
				new JavaAnnotation(JpaAnnotationTypes.Column, {
					name: this.formatColumnName(
							this.findTableFromEntity(sourceMetadata.entity, databaseModel).identityColumnName
					)
				})
			];

		}

		if (isEntityPropertySourceMetadata(sourceMetadata)) {

			const table = this.findTableFromEntity(sourceMetadata.entity, databaseModel);
			const column = table.columns.find(column => column.sourceMetadata.property === sourceMetadata.property)!;

			return [
				new JavaAnnotation(JpaAnnotationTypes.Column, {
					name: this.formatColumnName(column.name)
				})
			];

		}

		if (isRelationshipTargetSourceMetadata(sourceMetadata)) {

			const {
				relationship,
				targetMember
			} = sourceMetadata;

			const fieldBelongsToLeftMember = targetMember === relationship.rightMember;

			const isLeftMemberMany = relationship.leftMember.cardinality === Cardinality.MANY;
			const isRightMemberMany = relationship.rightMember.cardinality === Cardinality.MANY;

			const isOneToOneRelationship = !isLeftMemberMany && !isRightMemberMany;
			const isOneToManyRelationship = !isLeftMemberMany && isRightMemberMany;
			const isManyToOneRelationship = isLeftMemberMany && !isRightMemberMany;
			const isManyToManyRelationship = isLeftMemberMany && isRightMemberMany;

			if (isOneToOneRelationship) {

				if (fieldBelongsToLeftMember) {
					return this.getOneToOneRelationshipAnnotations(relationship.rightMember, databaseModel);
				}

				if (relationship.direction === Direction.BIDIRECTIONAL) {
					return this.getMappedByOneToOneRelationshipAnnotations(relationship.rightMember, relationship.leftMember, classModel);
				}

				return this.getInverseOneToOneRelationshipAnnotations(relationship.rightMember, relationship.leftMember, databaseModel);

			}

			if (isOneToManyRelationship) {

				if (!fieldBelongsToLeftMember) {
					return this.getManyToOneRelationshipAnnotations(relationship.leftMember, databaseModel);
				}

				if (relationship.direction === Direction.BIDIRECTIONAL) {
					return this.getMappedByOneToManyRelationshipAnnotations(relationship.leftMember, relationship.rightMember, classModel);
				}

				return this.getInverseOneToManyRelationshipAnnotations(relationship.leftMember, relationship.rightMember, databaseModel);

			}

			if (isManyToOneRelationship) {

				if (fieldBelongsToLeftMember) {
					return this.getManyToOneRelationshipAnnotations(relationship.rightMember, databaseModel);
				}

				if (relationship.direction === Direction.BIDIRECTIONAL) {
					return this.getMappedByOneToManyRelationshipAnnotations(relationship.rightMember, relationship.leftMember, classModel);
				}

				return this.getInverseOneToManyRelationshipAnnotations(relationship.rightMember, relationship.leftMember, databaseModel);

			}

			if (isManyToManyRelationship) {

				if (fieldBelongsToLeftMember) {
					return this.getManyToManyRelationshipAnnotations(relationship.leftMember, relationship.rightMember, databaseModel);
				}

				if (relationship.direction === Direction.BIDIRECTIONAL) {
					return this.getMappedByManyToManyRelationshipAnnotations(relationship.rightMember, relationship.leftMember, classModel);
				}

				return this.getManyToManyRelationshipAnnotations(relationship.rightMember, relationship.leftMember, databaseModel);

			}

			// TODO
			return [];

		}

		return [];

	}

	private getOneToOneRelationshipAnnotations(targetMember: RelationshipMember, databaseModel: DatabaseModel): JavaAnnotation[] {

		const {
			reference: referenceDescriptor
		} = this.findTableAndReferenceFromTargetMember(databaseModel, targetMember);

		return [
			new JavaAnnotation(JpaAnnotationTypes.OneToOne, {
				optional: targetMember.cardinality === Cardinality.ZERO_OR_ONE ? undefined : false
			}),
			new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
				name: this.formatColumnName(referenceDescriptor.columnName)
			}),
		];

	}

	private getMappedByOneToOneRelationshipAnnotations(sourceMember: RelationshipMember, targetMember: RelationshipMember, classModel: ClassModel): JavaAnnotation[] {

		// FIXME improve naming (even when it's correct to pass the sourceMember, it's also very confusing)
		const {field: targetField} = this.findFieldFromTargetMember(classModel, sourceMember);

		return [
			new JavaAnnotation(JpaAnnotationTypes.OneToOne, {
				optional: targetMember.cardinality === Cardinality.ZERO_OR_ONE ? undefined : false,
				mappedBy: targetField.name
			}),
		];
	}

	private getInverseOneToOneRelationshipAnnotations(sourceMember: RelationshipMember, targetMember: RelationshipMember, databaseModel: DatabaseModel): JavaAnnotation[] {

		// FIXME improve naming (even when it's correct to pass the sourceMember, it's also very confusing)
		const {
			table: tableDescriptor,
			reference: referenceDescriptor
		} = this.findTableAndReferenceFromTargetMember(databaseModel, sourceMember);

		return [
			new JavaAnnotation(JpaAnnotationTypes.OneToOne, {
				optional: targetMember.cardinality === Cardinality.ZERO_OR_ONE ? undefined : false
			}),
			new JavaAnnotation(JpaAnnotationTypes.JoinTable, {
				name: this.formatTableName(tableDescriptor.name),
				inverseJoinColumns: new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
					name: this.formatColumnName(referenceDescriptor.columnName),
					nullable: sourceMember.cardinality === Cardinality.ZERO_OR_ONE ? undefined : false
				}),
			}),
		];

	}

	private getManyToOneRelationshipAnnotations(targetMember: RelationshipMember, databaseModel: DatabaseModel): JavaAnnotation[] {

		const {
			reference: referenceDescriptor
		} = this.findTableAndReferenceFromTargetMember(databaseModel, targetMember);

		return [
			new JavaAnnotation(JpaAnnotationTypes.ManyToOne, {
				optional: targetMember.cardinality === Cardinality.ZERO_OR_ONE ? undefined : false
			}),
			new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
				name: this.formatColumnName(referenceDescriptor.columnName)
			}),
		];

	}

	private getMappedByOneToManyRelationshipAnnotations(sourceMember: RelationshipMember, targetMember: RelationshipMember, classModel: ClassModel): JavaAnnotation[] {

		// FIXME improve naming (even when it's correct to pass the sourceMember, it's also very confusing)
		const {field: targetField} = this.findFieldFromTargetMember(classModel, sourceMember);

		return [
			new JavaAnnotation(JpaAnnotationTypes.OneToMany, {
				mappedBy: targetField.name
			}),
		];
	}

	private getInverseOneToManyRelationshipAnnotations(sourceMember: RelationshipMember, targetMember: RelationshipMember, databaseModel: DatabaseModel): JavaAnnotation[] {

		// FIXME improve naming (even when it's correct to pass the sourceMember, it's also very confusing)
		const {
			table: tableDescriptor,
			reference: referenceDescriptor
		} = this.findTableAndReferenceFromTargetMember(databaseModel, sourceMember);

		return [
			new JavaAnnotation(JpaAnnotationTypes.OneToMany),
			new JavaAnnotation(JpaAnnotationTypes.JoinTable, {
				name: this.formatTableName(tableDescriptor.name),
				joinColumns: new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
					name: this.formatColumnName(referenceDescriptor.columnName)
				}),
			}),
		];

	}

	// TODO modify
	private getManyToManyRelationshipAnnotations(sourceMember: RelationshipMember, targetMember: RelationshipMember, databaseModel: DatabaseModel): JavaAnnotation[] {

		// FIXME improve naming (even when it's correct to pass the sourceMember, it's also very confusing)
		const {
			table: tableDescriptor,
			reference: externalReferenceDescriptor
		} = this.findTableAndReferenceFromTargetMember(databaseModel, sourceMember);

		if (tableDescriptor.references.length !== 2) {
			throw new Error('Relationship table has more than 2 references');
		}

		const selfReferenceDescriptor = tableDescriptor.references[0] === externalReferenceDescriptor
				? tableDescriptor.references[1]
				: tableDescriptor.references[0];

		return [
			new JavaAnnotation(JpaAnnotationTypes.ManyToMany),
			new JavaAnnotation(JpaAnnotationTypes.JoinTable, {
				name: this.formatTableName(tableDescriptor.name),
				joinColumns: new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
					name: this.formatColumnName(externalReferenceDescriptor.columnName)
				}),
				inverseJoinColumns: new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
					name: this.formatColumnName(selfReferenceDescriptor.columnName)
				}),
			}),
		];

	}

	// TODO modify
	private getMappedByManyToManyRelationshipAnnotations(sourceMember: RelationshipMember, targetMember: RelationshipMember, classModel: ClassModel): JavaAnnotation[] {

		// FIXME improve naming (even when it's correct to pass the sourceMember, it's also very confusing)
		const {field: targetField} = this.findFieldFromTargetMember(classModel, sourceMember);

		return [
			new JavaAnnotation(JpaAnnotationTypes.ManyToMany, {
				mappedBy: targetField.name
			}),
		];
	}

	private findTableAndReferenceFromTargetMember(databaseModel: DatabaseModel, targetMember: RelationshipMember) {

		for (const table of databaseModel.tables) {
			for (const reference of table.references) {
				if (reference.sourceMetadata.targetMember === targetMember) {
					return {
						table,
						reference
					};
				}
			}
		}

		throw new Error(`Cannot find reference from target member "${targetMember.entityAlias}"`);

	}

	private findFieldFromTargetMember(classModel: ClassModel, targetMember: RelationshipMember) {

		for (const classDescriptor of classModel.classes) {
			for (const field of classDescriptor.fields) {
				if (isRelationshipTargetSourceMetadata(field.sourceMetadata) && field.sourceMetadata.targetMember === targetMember) {
					return {
						classDescriptor,
						field
					};
				}
			}
		}

		throw new Error(`Cannot find field from target member "${targetMember.entityAlias}"`);

	}

	private getRelationshipSource(relationship: RelationshipDescriptor, targetMember: RelationshipMember) {
		return relationship.leftMember == targetMember
				? relationship.rightMember
				: relationship.leftMember;
	}

	private formatColumnName(columnName: string): string {
		return this.#columnNameCaseConverter.convertCase(columnName);
	}

	visitClass(javaClass: JavaClass, context: JavaClassTransformContext<JpaTransformerSetupData>): void {

		const table = this.findTableFromEntity(context.classDescriptor.sourceMetadata.entity, context.setupData.databaseModel);

		javaClass.annotations.push(
				new JavaAnnotation(JpaAnnotationTypes.Entity),
				new JavaAnnotation(JpaAnnotationTypes.Table, {
					name: this.formatTableName(table.name)
				})
		);

	}

	private findTableFromEntity(entity: EntityDescriptor, databaseModel: DatabaseModel): TableDescriptor {

		const foundTable = databaseModel.tables.find(table => this.isCorrespondingTable(entity, table));

		if (foundTable == null) {
			throw new Error(`Cannot find the corresponding table for entity "${entity.name}"`);
		}

		return foundTable;

	}

	private isCorrespondingTable(entity: EntityDescriptor, tableDescriptor: TableDescriptor): boolean {
		return isEntitySourceMetadata(tableDescriptor.sourceMetadata) && tableDescriptor.sourceMetadata.entity === entity;
	}

	private formatTableName(tableName: string): string {
		return this.#tableNameCaseConverter.convertCase(tableName);
	}

	visitModel(javaClassModel: JavaClassModel, context: JavaClassModelTransformContext<JpaTransformerSetupData>): void {
		// Do nothing
	}

}
