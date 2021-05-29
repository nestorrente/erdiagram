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
import PostgresqlColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/postgresql/column/PostgresqlColumnCodeGenerator';
import PostgresqlIdColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/postgresql/column/PostgresqlIdColumnCodeGenerator';
import PostgresqlForeignColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/postgresql/column/PostgresqlForeignColumnCodeGenerator';
import {PartialPostgresqlDialectConfig} from '@/erdiagram/converter/database/code-converter/sql/dialect/postgresql/config/PostgresqlDialectConfig';
import postgresqlDialectConfigManager
	from '@/erdiagram/converter/database/code-converter/sql/dialect/postgresql/config/PostgresqlDialectConfigManager';

export default class PostgresqlDialect implements SqlDialect {

	private readonly tableNameCaseConverter: CaseConverter;

	private readonly columnCodeGenerator: PostgresqlColumnCodeGenerator;
	private readonly idColumnCodeGenerator: PostgresqlIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: PostgresqlForeignColumnCodeGenerator;

	constructor(config?: PartialPostgresqlDialectConfig) {

		const fullConfig = postgresqlDialectConfigManager.mergeWithDefaultConfig(config);

		this.tableNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				fullConfig.tableNameCaseFormat
		);

		const columnNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				fullConfig.columnNameCaseFormat
		);

		const sqlTypeResolver = new SqlTypeResolver(fullConfig.typeBindings);

		this.columnCodeGenerator = new PostgresqlColumnCodeGenerator(
				sqlTypeResolver,
				columnNameCaseConverter
		);

		this.idColumnCodeGenerator = new PostgresqlIdColumnCodeGenerator(
				sqlTypeResolver,
				columnNameCaseConverter
		);

		this.foreignColumnCodeGenerator = new PostgresqlForeignColumnCodeGenerator(
				this.columnCodeGenerator,
				this.tableNameCaseConverter,
				columnNameCaseConverter
		);

	}

	getScriptStartCode() {
		return '';
	}

	getScriptEndCode() {
		return '';
	}

	mustUseAlterTableForForeignKeys(): boolean {
		return true;
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

	getAlterTableAddCode(tableName: string, constraintCode: string) {
		const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
		return `ALTER TABLE "${outputTableName}" ADD ${constraintCode};`;
	}

}
