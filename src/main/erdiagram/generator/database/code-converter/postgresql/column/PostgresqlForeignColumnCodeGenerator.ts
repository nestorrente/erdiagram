import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/model/database-model-types';
import PostgresqlColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlColumnCodeGenerator';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import {ForeignKeyColumnCode} from '@/erdiagram/generator/database/code-converter/common/sql-script-types';
import SqlForeignColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/common/column/SqlForeignColumnCodeGenerator';

export default class PostgresqlForeignColumnCodeGenerator implements SqlForeignColumnCodeGenerator {

	constructor(
			private readonly columnCodeGenerator: PostgresqlColumnCodeGenerator,
			private readonly tableNameCaseConverter: CaseConverter,
			private readonly columnNameCaseConverter: CaseConverter
	) {

	}

	public generateForeignColumnCode(outputTableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode {

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

	private createForeignKeyColumnDescriptor(reference: TableReferenceDescriptor): TableColumnDescriptor {

		const {
			columnName,
			notNull,
			unique
		} = reference;

		return {
			name: columnName,
			type: EntityPropertyType.IDENTIFIER,
			length: [],
			notNull,
			unique,
			autoincremental: false
		};

	}

	private createForeignKeyConstraint(outputTableName: string, reference: TableReferenceDescriptor) {

		const outputColumnName = this.columnNameCaseConverter.convertCase(reference.columnName);

		const outputTargetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
		const outputTargetColumnName = this.columnNameCaseConverter.convertCase(reference.targetTableIdentifierColumnName);

		return `CONSTRAINT "${outputTableName}_${outputColumnName}_fk" FOREIGN KEY ("${outputColumnName}")`
				+ ` REFERENCES "${outputTargetTableName}" ("${outputTargetColumnName}")`;

	}

}
