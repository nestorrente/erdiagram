import SqlDialect from '@/erdiagram/converter/database/code-converter/sql/dialect/common/SqlDialect';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import SqlTypeResolver from '@/erdiagram/converter/database/code-converter/sql/dialect/common/SqlTypeResolver';
import {
	ForeignKeyColumnCode,
	IdColumnCode,
	RegularColumnCode
} from '@/erdiagram/converter/database/code-converter/sql/dialect/common/sql-script-types';
import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/converter/database/model/database-model-types';
import SqliteColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/sqlite/column/SqliteColumnCodeGenerator';
import SqliteIdColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/sqlite/column/SqliteIdColumnCodeGenerator';
import SqliteForeignColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/sqlite/column/SqliteForeignColumnCodeGenerator';
import SqliteDialectConfig
	from '@/erdiagram/converter/database/code-converter/sql/dialect/sqlite/config/SqliteDialectConfig';
import sqliteDialectConfigManager
	from '@/erdiagram/converter/database/code-converter/sql/dialect/sqlite/config/SqliteDialectConfigManager';

export default class SqliteDialect implements SqlDialect {

	private readonly tableNameCaseConverter: CaseConverter;

	private readonly columnCodeGenerator: SqliteColumnCodeGenerator;
	private readonly idColumnCodeGenerator: SqliteIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: SqliteForeignColumnCodeGenerator;

	constructor(config?: Partial<SqliteDialectConfig>) {

		const fullConfig = sqliteDialectConfigManager.mergeWithDefaultConfig(config);

		this.tableNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				fullConfig.tableNameCaseFormat
		);

		const columnNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				fullConfig.columnNameCaseFormat
		);

		const sqlTypeResolver = new SqlTypeResolver(fullConfig.typeBindings);

		this.columnCodeGenerator = new SqliteColumnCodeGenerator(
				sqlTypeResolver,
				columnNameCaseConverter
		);

		this.idColumnCodeGenerator = new SqliteIdColumnCodeGenerator(
				sqlTypeResolver,
				columnNameCaseConverter
		);

		this.foreignColumnCodeGenerator = new SqliteForeignColumnCodeGenerator(
				this.columnCodeGenerator,
				this.tableNameCaseConverter,
				columnNameCaseConverter
		);

	}

	getScriptStartCode() {
		return 'PRAGMA foreign_keys = OFF;';
	}

	getScriptEndCode() {
		return 'PRAGMA foreign_keys = ON;';
	}

	mustUseAlterTableForForeignKeys(): boolean {
		return false;
	}

	getCreateTableStartCode(tableName: string) {
		const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
		return `CREATE TABLE "${outputTableName}" (`;
	}

	getCreateTableEndCode() {
		return ');';
	}

	getIdColumnCode(tableName: string, identityColumnName: string): IdColumnCode {
		const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
		return this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, identityColumnName);
	}

	getColumnCode(tableName: string, column: TableColumnDescriptor): RegularColumnCode {
		const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
		return this.columnCodeGenerator.generateColumnCode(outputTableName, column);
	}

	getForeignColumnCode(tableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode {
		const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
		return this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);
	}

	/* istanbul ignore next */
	getAlterTableAddCode(tableName: string, constraintCode: string): string {
		throw new Error('Unsupported feature');
	}

}
