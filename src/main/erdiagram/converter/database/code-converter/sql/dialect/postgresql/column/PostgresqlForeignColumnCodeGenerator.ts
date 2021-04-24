import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/converter/database/model/database-model-types';
import PostgresqlColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/postgresql/column/PostgresqlColumnCodeGenerator';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import {ForeignKeyColumnCode} from '@/erdiagram/converter/database/code-converter/sql/dialect/common/sql-script-types';
import SqlForeignColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/common/column/SqlForeignColumnCodeGenerator';
import {OmitSource} from '@/erdiagram/converter/oop/model/source-metadata-types';

export default class PostgresqlForeignColumnCodeGenerator implements SqlForeignColumnCodeGenerator {

	constructor(
			private readonly columnCodeGenerator: PostgresqlColumnCodeGenerator,
			private readonly tableNameCaseConverter: CaseConverter,
			private readonly columnNameCaseConverter: CaseConverter
	) {

	}

	public generateForeignColumnCode(outputTableName: string, reference: OmitSource<TableReferenceDescriptor>): ForeignKeyColumnCode {

		const columnDescriptor = this.createForeignKeyColumnDescriptor(reference);

		const {
			columnLine,
			uniqueConstraintLine
		} = this.columnCodeGenerator.generateColumnCode(outputTableName, columnDescriptor);

		return {
			columnLine,
			uniqueConstraintLine,
			fkConstraintLine: this.createForeignKeyConstraint(outputTableName, reference)
		};

	}

	private createForeignKeyColumnDescriptor(reference: OmitSource<TableReferenceDescriptor>): OmitSource<TableColumnDescriptor> {

		const {
			columnName,
			notNull,
			unique
		} = reference;

		return {
			name: columnName,
			type: EntityPropertyType.IDENTITY,
			length: [],
			notNull,
			unique
		};

	}

	private createForeignKeyConstraint(outputTableName: string, reference: OmitSource<TableReferenceDescriptor>) {

		const outputColumnName = this.columnNameCaseConverter.convertCase(reference.columnName);

		const outputTargetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
		const outputTargetColumnName = this.columnNameCaseConverter.convertCase(reference.targetTableIdentityColumnName);

		return `CONSTRAINT "${outputTableName}_${outputColumnName}_fk" FOREIGN KEY ("${outputColumnName}")`
				+ ` REFERENCES "${outputTargetTableName}" ("${outputTargetColumnName}")`;

	}

}
