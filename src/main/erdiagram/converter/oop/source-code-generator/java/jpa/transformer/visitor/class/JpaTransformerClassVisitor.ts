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

	readonly #tableNameCaseConverter: CaseConverter;

	constructor(tableNameCaseConverter: CaseConverter) {
		this.#tableNameCaseConverter = tableNameCaseConverter;
	}

	public visitClass(javaClass: JavaClass, context: JavaClassTransformContext<JpaTransformerSetupData>): void {

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

}
