import {JavaFieldTransformContext} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import {JavaField} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import {DatabaseModel} from '@/erdiagram/converter/database/model/database-model-types';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import {
	isEntityIdentitySourceMetadata,
	isEntityPropertySourceMetadata
} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-utils';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import EntityRelationshipModelSourceFinder
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/EntityRelationshipModelSourceFinder';
import {JpaAnnotationTypes} from '@/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types';
import JpaTransformerSetupData
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupData';
import FieldAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/FieldAnnotationsSupplier';

export default class ColumnFieldAnnotationsSupplier implements FieldAnnotationsSupplier {

	private readonly _entityRelationshipModelSourceFinder: EntityRelationshipModelSourceFinder;
	private readonly _columnNameCaseConverter: CaseConverter;

	constructor(
			entityRelationshipModelSourceFinder: EntityRelationshipModelSourceFinder,
			columnNameCaseConverter: CaseConverter
	) {
		this._entityRelationshipModelSourceFinder = entityRelationshipModelSourceFinder;
		this._columnNameCaseConverter = columnNameCaseConverter;
	}

	public getAnnotations(javaField: JavaField, context: JavaFieldTransformContext<JpaTransformerSetupData>): JavaAnnotation[] {
		const columnAnnotation = this.getColumnAnnotation(context.fieldDescriptor, context.setupData.databaseModel);
		return columnAnnotation != null ? [columnAnnotation] : [];
	}

	private getColumnAnnotation(fieldDescriptor: ClassFieldDescriptor, databaseModel: DatabaseModel): JavaAnnotation | null {

		const {sourceMetadata} = fieldDescriptor;

		const columnName = this.getColumnName(fieldDescriptor, databaseModel);

		if (columnName == null) {
			return null;
		}

		return new JavaAnnotation(JpaAnnotationTypes.Column, {
			name: this.formatColumnName(columnName),
			nullable: fieldDescriptor.nullable ? undefined : false
		});

	}

	private getColumnName(fieldDescriptor: ClassFieldDescriptor, databaseModel: DatabaseModel): string | null {

		const {sourceMetadata} = fieldDescriptor;

		if (isEntityIdentitySourceMetadata(sourceMetadata)) {
			const table = this._entityRelationshipModelSourceFinder.findTableFromEntity(databaseModel, sourceMetadata.entity);
			return table.identityColumnName;
		}

		if (isEntityPropertySourceMetadata(sourceMetadata)) {
			const column = this._entityRelationshipModelSourceFinder.findColumnFromProperty(databaseModel, sourceMetadata.property);
			return column.name;

		}

		return null;

	}

	private formatColumnName(columnName: string): string {
		return this._columnNameCaseConverter.convertCase(columnName);
	}

}
