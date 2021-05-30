import SqlDialect from '@/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlDialect';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import SqlServerColumnCodeGenerator
	from '@/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/column/SqlServerColumnCodeGenerator';
import SqlServerIdColumnCodeGenerator
	from '@/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/column/SqlServerIdColumnCodeGenerator';
import SqlServerForeignColumnCodeGenerator
	from '@/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/column/SqlServerForeignColumnCodeGenerator';
import {PartialSqlServerDialectConfig} from '@/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/config/SqlServerDialectConfig';
import sqlServerDialectConfigManager
	from '@/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/config/SqlServerDialectConfigManager';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import SqlTypeResolver from '@/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlTypeResolver';
import {
	ForeignKeyColumnCode,
	IdColumnCode,
	RegularColumnCode
} from '@/erdiagram/converter/database/source-code-generator/sql/dialect/common/sql-script-types';
import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/converter/database/model/database-model-types';

export default class SqlServerDialect implements SqlDialect {

	private readonly tableNameCaseConverter: CaseConverter;

	private readonly columnCodeGenerator: SqlServerColumnCodeGenerator;
	private readonly idColumnCodeGenerator: SqlServerIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: SqlServerForeignColumnCodeGenerator;

	constructor(config?: PartialSqlServerDialectConfig) {

		const fullConfig = sqlServerDialectConfigManager.mergeWithDefaultConfig(config);

		this.tableNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				fullConfig.tableNameCaseFormat
		);

		const columnNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				fullConfig.columnNameCaseFormat
		);

		const sqlTypeResolver = new SqlTypeResolver(fullConfig.typeBindings);

		this.columnCodeGenerator = new SqlServerColumnCodeGenerator(
				sqlTypeResolver,
				columnNameCaseConverter
		);

		this.idColumnCodeGenerator = new SqlServerIdColumnCodeGenerator(
				sqlTypeResolver,
				columnNameCaseConverter
		);

		this.foreignColumnCodeGenerator = new SqlServerForeignColumnCodeGenerator(
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
