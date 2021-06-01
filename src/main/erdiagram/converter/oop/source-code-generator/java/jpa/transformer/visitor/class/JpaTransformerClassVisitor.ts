import {JavaClassTransformContext} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import {JavaClass} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import {DatabaseModel, TableDescriptor} from '@/erdiagram/converter/database/model/database-model-types';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import {isEntitySourceMetadata} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-utils';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import {EntityDescriptor} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {JpaAnnotationTypes} from '@/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types';
import JpaTransformerSetupData
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupData';

export default class JpaTransformerClassVisitor {

	private readonly _tableNameCaseConverter: CaseConverter;
	private readonly _useExplicitTableName: boolean;

	constructor(tableNameCaseConverter: CaseConverter, useExplicitTableName: boolean) {
		this._tableNameCaseConverter = tableNameCaseConverter;
		this._useExplicitTableName = useExplicitTableName;
	}

	public visitClass(javaClass: JavaClass, context: JavaClassTransformContext<JpaTransformerSetupData>): void {

		const table = this.findTableFromEntity(context.classDescriptor.sourceMetadata.entity, context.setupData.databaseModel);

		javaClass.annotations.push(new JavaAnnotation(JpaAnnotationTypes.Entity));

		if (this._useExplicitTableName) {
			this.addTableAnnotation(javaClass, table);
		}

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

	private addTableAnnotation(javaClass: JavaClass, table: TableDescriptor) {

		const tableAnnotation = new JavaAnnotation(JpaAnnotationTypes.Table, {
			name: this.formatTableName(table.name)
		});

		javaClass.annotations.push(tableAnnotation);

	}

	private formatTableName(tableName: string): string {
		return this._tableNameCaseConverter.convertCase(tableName);
	}

}
