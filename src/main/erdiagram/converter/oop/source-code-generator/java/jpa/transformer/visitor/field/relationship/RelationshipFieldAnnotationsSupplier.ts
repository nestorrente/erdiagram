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
import DatabaseModelSourceFinder
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/DatabaseModelSourceFinder';
import JpaTransformerSetupData
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupData';
import FieldAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/FieldAnnotationsSupplier';
import ClassModelSourceFinder
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/ClassModelSourceFinder';
import JpaAnnotationTypesProvider
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/JpaAnnotationTypesProvider';

enum RelationshipCardinality {
	ONE_TO_ONE = 'one_to_one',
	ONE_TO_MANY = 'one_to_many',
	MANY_TO_ONE = 'many_to_one',
	MANY_TO_MANY = 'many_to_many'
}

// TODO split this class
export default class RelationshipFieldAnnotationsSupplier implements FieldAnnotationsSupplier {

	constructor(
			private readonly _databaseModelSourceFinder: DatabaseModelSourceFinder,
			private readonly _classModelSourceFinder: ClassModelSourceFinder,
			private readonly _tableNameCaseConverter: CaseConverter,
			private readonly _columnNameCaseConverter: CaseConverter,
			private readonly _annotationTypesProvider: JpaAnnotationTypesProvider,
	) {}

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

		switch (relationshipCardinality) {

			case RelationshipCardinality.ONE_TO_ONE:

				if (fieldBelongsToLeftMember) {
					return this.getOneToOneRelationshipAnnotations(relationship.rightMember, databaseModel);
				}

				if (relationship.direction === Direction.BIDIRECTIONAL) {
					return this.getMappedByOneToOneRelationshipAnnotations(relationship.rightMember, relationship.leftMember, classModel);
				}

				return this.getInverseOneToOneRelationshipAnnotations(relationship.rightMember, relationship.leftMember, databaseModel);

			case RelationshipCardinality.MANY_TO_ONE:

				if (fieldBelongsToLeftMember) {
					return this.getManyToOneRelationshipAnnotations(relationship.rightMember, databaseModel);
				}

				if (relationship.direction === Direction.BIDIRECTIONAL) {
					return this.getMappedByOneToManyRelationshipAnnotations(relationship.rightMember, classModel);
				}

				return this.getInverseOneToManyRelationshipAnnotations(relationship.rightMember, databaseModel);

			case RelationshipCardinality.ONE_TO_MANY:

				if (!fieldBelongsToLeftMember) {
					return this.getManyToOneRelationshipAnnotations(relationship.leftMember, databaseModel);
				}

				if (relationship.direction === Direction.BIDIRECTIONAL) {
					return this.getMappedByOneToManyRelationshipAnnotations(relationship.leftMember, classModel);
				}

				return this.getInverseOneToManyRelationshipAnnotations(relationship.leftMember, databaseModel);

			case RelationshipCardinality.MANY_TO_MANY:

				if (fieldBelongsToLeftMember) {
					return this.getManyToManyRelationshipAnnotations(relationship.leftMember, databaseModel);
				}

				if (relationship.direction === Direction.BIDIRECTIONAL) {
					return this.getMappedByManyToManyRelationshipAnnotations(relationship.rightMember, classModel);
				}

				return this.getManyToManyRelationshipAnnotations(relationship.rightMember, databaseModel);

		}

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
		} = this._databaseModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, foreignMember);

		const optionalRelationship = foreignMember.cardinality === Cardinality.ZERO_OR_ONE;

		return [
			new JavaAnnotation(this._annotationTypesProvider.oneToOne(), {
				optional: optionalRelationship ? undefined : false
			}),
			new JavaAnnotation(this._annotationTypesProvider.joinColumn(), {
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
			new JavaAnnotation(this._annotationTypesProvider.oneToOne(), {
				mappedBy: field.name,
				optional: foreignMember.cardinality === Cardinality.ZERO_OR_ONE ? undefined : false
			}),
		];
	}

	private getInverseOneToOneRelationshipAnnotations(ownMember: RelationshipMember, foreignMember: RelationshipMember, databaseModel: DatabaseModel): JavaAnnotation[] {

		const {
			table,
			reference
		} = this._databaseModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, ownMember);

		return [
			new JavaAnnotation(this._annotationTypesProvider.oneToOne(), {
				optional: foreignMember.cardinality === Cardinality.ZERO_OR_ONE ? undefined : false
			}),
			new JavaAnnotation(this._annotationTypesProvider.joinTable(), {
				name: this.formatTableName(table.name),
				inverseJoinColumns: new JavaAnnotation(this._annotationTypesProvider.joinColumn(), {
					name: this.formatColumnName(reference.columnName),
					nullable: ownMember.cardinality === Cardinality.ZERO_OR_ONE ? undefined : false
				}),
			}),
		];

	}

	private getManyToOneRelationshipAnnotations(foreignMember: RelationshipMember, databaseModel: DatabaseModel): JavaAnnotation[] {

		const {
			reference
		} = this._databaseModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, foreignMember);

		const optionalRelationship = foreignMember.cardinality === Cardinality.ZERO_OR_ONE;

		return [
			new JavaAnnotation(this._annotationTypesProvider.manyToOne(), {
				optional: optionalRelationship ? undefined : false
			}),
			new JavaAnnotation(this._annotationTypesProvider.joinColumn(), {
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
			new JavaAnnotation(this._annotationTypesProvider.oneToMany(), {
				mappedBy: field.name
			}),
		];
	}

	private getInverseOneToManyRelationshipAnnotations(ownMember: RelationshipMember, databaseModel: DatabaseModel): JavaAnnotation[] {

		const {
			table,
			reference
		} = this._databaseModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, ownMember);

		return [
			new JavaAnnotation(this._annotationTypesProvider.oneToMany()),
			new JavaAnnotation(this._annotationTypesProvider.joinTable(), {
				name: this.formatTableName(table.name),
				inverseJoinColumns: new JavaAnnotation(this._annotationTypesProvider.joinColumn(), {
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
		} = this._databaseModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, ownMember);

		/* istanbul ignore next */
		if (table.references.length !== 2) {
			throw new Error('Relationship table has more than 2 references');
		}

		const foreignReference = table.references.find(reference => reference !== ownReference)!;

		return [
			new JavaAnnotation(this._annotationTypesProvider.manyToMany()),
			new JavaAnnotation(this._annotationTypesProvider.joinTable(), {
				name: this.formatTableName(table.name),
				joinColumns: new JavaAnnotation(this._annotationTypesProvider.joinColumn(), {
					name: this.formatColumnName(ownReference.columnName),
					nullable: false
				}),
				inverseJoinColumns: new JavaAnnotation(this._annotationTypesProvider.joinColumn(), {
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
			new JavaAnnotation(this._annotationTypesProvider.manyToMany(), {
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
