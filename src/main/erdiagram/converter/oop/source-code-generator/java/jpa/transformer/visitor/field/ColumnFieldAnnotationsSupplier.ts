import {JavaFieldTransformContext} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import {JavaField} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import {DatabaseModel} from '@/erdiagram/converter/database/model/database-model-types';
import JavaAnnotation, {JavaAnnotationParametersRecord} from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import {
	isEntityIdentitySourceMetadata,
	isEntityPropertySourceMetadata
} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-utils';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import DatabaseModelSourceFinder
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/DatabaseModelSourceFinder';
import {JpaAnnotationTypes} from '@/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types';
import JpaTransformerSetupData
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupData';
import FieldAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/FieldAnnotationsSupplier';

export default class ColumnFieldAnnotationsSupplier implements FieldAnnotationsSupplier {

	private readonly _databaseModelSourceFinder: DatabaseModelSourceFinder;
	private readonly _columnNameCaseConverter: CaseConverter;
	private readonly _useExplicitColumnName: boolean;

	constructor(
			databaseModelSourceFinder: DatabaseModelSourceFinder,
			columnNameCaseConverter: CaseConverter,
			useExplicitColumnName: boolean
	) {
		this._databaseModelSourceFinder = databaseModelSourceFinder;
		this._columnNameCaseConverter = columnNameCaseConverter;
		this._useExplicitColumnName = useExplicitColumnName;
	}

	public getAnnotations(javaField: JavaField, context: JavaFieldTransformContext<JpaTransformerSetupData>): JavaAnnotation[] {
		const columnAnnotation = this.getColumnAnnotation(context.fieldDescriptor, context.setupData.databaseModel);
		return columnAnnotation != null ? [columnAnnotation] : [];
	}

	private getColumnAnnotation(fieldDescriptor: ClassFieldDescriptor, databaseModel: DatabaseModel): JavaAnnotation | null {

		const columnName = this.getColumnName(fieldDescriptor, databaseModel);

		if (columnName == null) {
			return null;
		}

		const columnAnnotationParameters: JavaAnnotationParametersRecord = {
			name: this._useExplicitColumnName ? this.formatColumnName(columnName) : undefined,
			nullable: fieldDescriptor.nullable ? undefined : false
		};

		const allValuesAreUndefined = Object.values(columnAnnotationParameters).every(parameterValue => parameterValue === undefined);

		if (allValuesAreUndefined) {
			// Column annotation is not needed
			return null;
		}

		return new JavaAnnotation(JpaAnnotationTypes.Column, columnAnnotationParameters);

	}

	private getColumnName(fieldDescriptor: ClassFieldDescriptor, databaseModel: DatabaseModel): string | null {

		const {sourceMetadata} = fieldDescriptor;

		if (isEntityIdentitySourceMetadata(sourceMetadata)) {
			const table = this._databaseModelSourceFinder.findTableFromEntity(databaseModel, sourceMetadata.entity);
			return table.identityColumnName;
		}

		if (isEntityPropertySourceMetadata(sourceMetadata)) {
			const column = this._databaseModelSourceFinder.findColumnFromProperty(databaseModel, sourceMetadata.property);
			return column.name;

		}

		return null;

	}

	private formatColumnName(columnName: string): string {
		return this._columnNameCaseConverter.convertCase(columnName);
	}

}
