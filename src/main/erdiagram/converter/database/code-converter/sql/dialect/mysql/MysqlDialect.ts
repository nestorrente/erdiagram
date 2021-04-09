import SqlDialect from '@/erdiagram/converter/database/code-converter/sql/dialect/common/SqlDialect';
import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/converter/database/model/database-model-types';
import {
	ForeignKeyColumnCode,
	IdColumnCode,
	RegularColumnCode
} from '@/erdiagram/converter/database/code-converter/sql/dialect/common/sql-script-types';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import MysqlColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/mysql/column/MysqlColumnCodeGenerator';
import MysqlIdColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/mysql/column/MysqlIdColumnCodeGenerator';
import MysqlForeignColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/mysql/column/MysqlForeignColumnCodeGenerator';
import SqlTypeResolver from '@/erdiagram/converter/database/code-converter/sql/dialect/common/SqlTypeResolver';
import mysqlDialectConfigManager
	from '@/erdiagram/converter/database/code-converter/sql/dialect/mysql/config/MysqlDialectConfigManager';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import MysqlDialectConfig
	from '@/erdiagram/converter/database/code-converter/sql/dialect/mysql/config/MysqlDialectConfig';

export default class MysqlDialect implements SqlDialect {

	private readonly tableNameCaseConverter: CaseConverter;

	private readonly columnCodeGenerator: MysqlColumnCodeGenerator;
	private readonly idColumnCodeGenerator: MysqlIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: MysqlForeignColumnCodeGenerator;

	constructor(config?: Partial<MysqlDialectConfig>) {

		const fullConfig = mysqlDialectConfigManager.mergeWithDefaultConfig(config);

		this.tableNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				fullConfig.tableNameCaseFormat
		);

		const columnNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				fullConfig.columnNameCaseFormat
		);

		const sqlTypeResolver = new SqlTypeResolver(fullConfig.typeBindings);

		this.columnCodeGenerator = new MysqlColumnCodeGenerator(
				sqlTypeResolver,
				columnNameCaseConverter
		);

		this.idColumnCodeGenerator = new MysqlIdColumnCodeGenerator(
				sqlTypeResolver,
				columnNameCaseConverter
		);

		this.foreignColumnCodeGenerator = new MysqlForeignColumnCodeGenerator(
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
		return `CREATE TABLE \`${outputTableName}\` (`;
	}

	getCreateTableEndCode() {
		return ');';
	}

	getIdColumnCode(tableName: string, identifierColumnName: string): IdColumnCode {
		const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
		return this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, identifierColumnName);
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
		return `ALTER TABLE \`${outputTableName}\` ADD ${constraintCode};`;
	}

}
