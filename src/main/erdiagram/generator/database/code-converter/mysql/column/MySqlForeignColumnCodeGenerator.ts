import {EntityPropertyType} from '@/erdiagram/parser/statement/statement-types-parse-functions';
import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/database-model/database-model-types';
import ForeignKeyColumnCode
	from '@/erdiagram/generator/database/code-converter/mysql/column/types/ForeignKeyColumnCode';
import MySqlColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/mysql/column/MySqlColumnCodeGenerator';
import IdNamingStrategy from '@/erdiagram/generator/common/id-naming-strategy/IdNamingStrategy';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';

const INDENT: string = '    ';

export default class MySqlForeignColumnCodeGenerator {

	constructor(
			private readonly idNamingStrategy: IdNamingStrategy,
			private readonly columnCodeGenerator: MySqlColumnCodeGenerator,
			private readonly tableNameCaseConverter: CaseConverter,
			private readonly columnNameCaseConverter: CaseConverter
	) {

	}

	public generateForeignColumnCode(tableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode {

		const columnDescriptor = this.createForeignKeyColumnDescriptor(reference);

		const {
			columnLine,
			uniqueConstraintLine
		} = this.columnCodeGenerator.generateColumnCode(tableName, columnDescriptor);

		return {
			columnLine,
			uniqueConstraintLine,
			fkConstraintLine: this.createForeignKeyConstraint(tableName, reference)
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
			type: EntityPropertyType.LONG,
			notNull,
			unique,
			autoincremental: false
		};

	}

	private createForeignKeyConstraint(tableName: string, reference: TableReferenceDescriptor) {

		const columnName = this.columnNameCaseConverter.convertCase(reference.columnName);

		const targetTableName = this.tableNameCaseConverter.convertCase(reference.targetTableName);
		const targetColumnName = this.columnNameCaseConverter.convertCase(this.getTableId(targetTableName));

		return `CONSTRAINT \`${tableName}_${columnName}_fk\` FOREIGN KEY (\`${columnName}\`)`
				+ ` REFERENCES \`${targetTableName}\` (\`${targetColumnName}\`)`;

	}

	private getTableId(tableName: string) {
		const {idNamingStrategy} = this;
		return idNamingStrategy(tableName);
	}

}
