import {JavaFieldTransformContext} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import {JavaField} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import {DatabaseModel} from '@/erdiagram/converter/database/model/database-model-types';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import {isRelationshipMemberSourceMetadata} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-utils';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import {
	Cardinality,
	Direction,
	RelationshipDescriptor,
	RelationshipMember
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import EntityRelationshipModelSourceFinder
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/EntityRelationshipModelSourceFinder';
import {JpaAnnotationTypes} from '@/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types';
import JpaTransformerSetupData
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupData';
import FieldAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/FieldAnnotationsSupplier';
import ClassModelSourceFinder
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/ClassModelSourceFinder';

enum RelationshipCardinality {
	ONE_TO_ONE = 'one_to_one',
	ONE_TO_MANY = 'one_to_many',
	MANY_TO_ONE = 'many_to_one',
	MANY_TO_MANY = 'many_to_many'
}

// TODO split this class
export default class RelationshipFieldAnnotationsSupplier implements FieldAnnotationsSupplier {

	private readonly _entityRelationshipModelSourceFinder: EntityRelationshipModelSourceFinder;
	private readonly _classModelSourceFinder: ClassModelSourceFinder;
	private readonly _tableNameCaseConverter: CaseConverter;
	private readonly _columnNameCaseConverter: CaseConverter;

	constructor(
			entityRelationshipModelSourceFinder: EntityRelationshipModelSourceFinder,
			classModelSourceFinder: ClassModelSourceFinder,
			tableNameCaseConverter: CaseConverter,
			columnNameCaseConverter: CaseConverter
	) {
		this._entityRelationshipModelSourceFinder = entityRelationshipModelSourceFinder;
		this._classModelSourceFinder = classModelSourceFinder;
		this._tableNameCaseConverter = tableNameCaseConverter;
		this._columnNameCaseConverter = columnNameCaseConverter;
	}

	public getAnnotations(javaField: JavaField, context: JavaFieldTransformContext<JpaTransformerSetupData>): JavaAnnotation[] {

		const {
			fieldDescriptor: {
				sourceMetadata
			},
			classModel,
			setupData: {
				databaseModel
			}
		} = context;

		if (!isRelationshipMemberSourceMetadata(sourceMetadata)) {
			return [];
		}

		const {
			relationship,
			referencedMember
		} = sourceMetadata;

		const fieldBelongsToLeftMember = referencedMember === relationship.rightMember;

		const relationshipCardinality = this.getRelationshipCardinality(relationship);

		if (relationshipCardinality === RelationshipCardinality.ONE_TO_ONE) {

			if (fieldBelongsToLeftMember) {
				return this.getOneToOneRelationshipAnnotations(relationship.rightMember, databaseModel);
			}

			if (relationship.direction === Direction.BIDIRECTIONAL) {
				return this.getMappedByOneToOneRelationshipAnnotations(relationship.rightMember, relationship.leftMember, classModel);
			}

			return this.getInverseOneToOneRelationshipAnnotations(relationship.rightMember, relationship.leftMember, databaseModel);

		}

		if (relationshipCardinality === RelationshipCardinality.MANY_TO_ONE) {

			if (fieldBelongsToLeftMember) {
				return this.getManyToOneRelationshipAnnotations(relationship.rightMember, databaseModel);
			}

			if (relationship.direction === Direction.BIDIRECTIONAL) {
				return this.getMappedByOneToManyRelationshipAnnotations(relationship.rightMember, classModel);
			}

			return this.getInverseOneToManyRelationshipAnnotations(relationship.rightMember, databaseModel);

		}

		if (relationshipCardinality === RelationshipCardinality.ONE_TO_MANY) {

			if (!fieldBelongsToLeftMember) {
				return this.getManyToOneRelationshipAnnotations(relationship.leftMember, databaseModel);
			}

			if (relationship.direction === Direction.BIDIRECTIONAL) {
				return this.getMappedByOneToManyRelationshipAnnotations(relationship.leftMember, classModel);
			}

			return this.getInverseOneToManyRelationshipAnnotations(relationship.leftMember, databaseModel);

		}

		if (relationshipCardinality === RelationshipCardinality.MANY_TO_MANY) {

			if (fieldBelongsToLeftMember) {
				return this.getManyToManyRelationshipAnnotations(relationship.leftMember, databaseModel);
			}

			if (relationship.direction === Direction.BIDIRECTIONAL) {
				return this.getMappedByManyToManyRelationshipAnnotations(relationship.rightMember, classModel);
			}

			return this.getManyToManyRelationshipAnnotations(relationship.rightMember, databaseModel);

		}

		return [];

	}

	private getRelationshipCardinality(relationship: RelationshipDescriptor): RelationshipCardinality {

		const isLeftMemberMany = relationship.leftMember.cardinality === Cardinality.MANY;
		const isRightMemberMany = relationship.rightMember.cardinality === Cardinality.MANY;

		if (isLeftMemberMany) {
			return isRightMemberMany ? RelationshipCardinality.MANY_TO_MANY : RelationshipCardinality.MANY_TO_ONE;
		} else {
			return isRightMemberMany ? RelationshipCardinality.ONE_TO_MANY : RelationshipCardinality.ONE_TO_ONE;
		}

	}

	private getOneToOneRelationshipAnnotations(foreignMember: RelationshipMember, databaseModel: DatabaseModel): JavaAnnotation[] {

		const {
			reference
		} = this._entityRelationshipModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, foreignMember);

		const optionalRelationship = foreignMember.cardinality === Cardinality.ZERO_OR_ONE;

		return [
			new JavaAnnotation(JpaAnnotationTypes.OneToOne, {
				optional: optionalRelationship ? undefined : false
			}),
			new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
				name: this.formatColumnName(reference.columnName),
				nullable: optionalRelationship ? undefined : false
			}),
		];

	}

	private getMappedByOneToOneRelationshipAnnotations(ownMember: RelationshipMember, foreignMember: RelationshipMember, classModel: ClassModel): JavaAnnotation[] {

		const {
			field
		} = this._classModelSourceFinder.findClassAndFieldFromReferencedMember(classModel, ownMember);

		return [
			new JavaAnnotation(JpaAnnotationTypes.OneToOne, {
				mappedBy: field.name,
				optional: foreignMember.cardinality === Cardinality.ZERO_OR_ONE ? undefined : false
			}),
		];
	}

	private getInverseOneToOneRelationshipAnnotations(ownMember: RelationshipMember, foreignMember: RelationshipMember, databaseModel: DatabaseModel): JavaAnnotation[] {

		const {
			table,
			reference
		} = this._entityRelationshipModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, ownMember);

		return [
			new JavaAnnotation(JpaAnnotationTypes.OneToOne, {
				optional: foreignMember.cardinality === Cardinality.ZERO_OR_ONE ? undefined : false
			}),
			new JavaAnnotation(JpaAnnotationTypes.JoinTable, {
				name: this.formatTableName(table.name),
				inverseJoinColumns: new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
					name: this.formatColumnName(reference.columnName),
					nullable: ownMember.cardinality === Cardinality.ZERO_OR_ONE ? undefined : false
				}),
			}),
		];

	}

	private getManyToOneRelationshipAnnotations(foreignMember: RelationshipMember, databaseModel: DatabaseModel): JavaAnnotation[] {

		const {
			reference
		} = this._entityRelationshipModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, foreignMember);

		const optionalRelationship = foreignMember.cardinality === Cardinality.ZERO_OR_ONE;

		return [
			new JavaAnnotation(JpaAnnotationTypes.ManyToOne, {
				optional: optionalRelationship ? undefined : false
			}),
			new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
				name: this.formatColumnName(reference.columnName),
				nullable: optionalRelationship ? undefined : false
			}),
		];

	}

	private getMappedByOneToManyRelationshipAnnotations(ownMember: RelationshipMember, classModel: ClassModel): JavaAnnotation[] {

		const {
			field
		} = this._classModelSourceFinder.findClassAndFieldFromReferencedMember(classModel, ownMember);

		return [
			new JavaAnnotation(JpaAnnotationTypes.OneToMany, {
				mappedBy: field.name
			}),
		];
	}

	private getInverseOneToManyRelationshipAnnotations(ownMember: RelationshipMember, databaseModel: DatabaseModel): JavaAnnotation[] {

		const {
			table,
			reference
		} = this._entityRelationshipModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, ownMember);

		return [
			new JavaAnnotation(JpaAnnotationTypes.OneToMany),
			new JavaAnnotation(JpaAnnotationTypes.JoinTable, {
				name: this.formatTableName(table.name),
				inverseJoinColumns: new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
					name: this.formatColumnName(reference.columnName),
					nullable: ownMember.cardinality === Cardinality.ZERO_OR_ONE ? undefined : false
				}),
			}),
		];

	}

	private getManyToManyRelationshipAnnotations(ownMember: RelationshipMember, databaseModel: DatabaseModel): JavaAnnotation[] {

		const {
			table,
			reference: ownReference
		} = this._entityRelationshipModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, ownMember);

		if (table.references.length !== 2) {
			throw new Error('Relationship table has more than 2 references');
		}

		const foreignReference = table.references.find(reference => reference !== ownReference)!;

		return [
			new JavaAnnotation(JpaAnnotationTypes.ManyToMany),
			new JavaAnnotation(JpaAnnotationTypes.JoinTable, {
				name: this.formatTableName(table.name),
				joinColumns: new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
					name: this.formatColumnName(ownReference.columnName),
					nullable: false
				}),
				inverseJoinColumns: new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
					name: this.formatColumnName(foreignReference.columnName),
					nullable: false
				}),
			}),
		];

	}

	private getMappedByManyToManyRelationshipAnnotations(sourceMember: RelationshipMember, classModel: ClassModel): JavaAnnotation[] {

		const {
			field: referencedField
		} = this._classModelSourceFinder.findClassAndFieldFromReferencedMember(classModel, sourceMember);

		return [
			new JavaAnnotation(JpaAnnotationTypes.ManyToMany, {
				mappedBy: referencedField.name
			}),
		];
	}

	private formatColumnName(columnName: string): string {
		return this._columnNameCaseConverter.convertCase(columnName);
	}

	private formatTableName(tableName: string): string {
		return this._tableNameCaseConverter.convertCase(tableName);
	}

}
