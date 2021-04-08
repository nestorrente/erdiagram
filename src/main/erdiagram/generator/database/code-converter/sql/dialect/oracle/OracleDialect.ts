import SqlDialect from '@/erdiagram/generator/database/code-converter/sql/dialect/common/SqlDialect';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import OracleColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sql/dialect/oracle/column/OracleColumnCodeGenerator';
import OracleIdColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sql/dialect/oracle/column/OracleIdColumnCodeGenerator';
import OracleForeignColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sql/dialect/oracle/column/OracleForeignColumnCodeGenerator';
import OracleDialectConfig
	from '@/erdiagram/generator/database/code-converter/sql/dialect/oracle/config/OracleDialectConfig';
import oracleDialectConfigManager
	from '@/erdiagram/generator/database/code-converter/sql/dialect/oracle/config/OracleDialectConfigManager';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import SqlTypeResolver from '@/erdiagram/generator/database/code-converter/sql/dialect/common/SqlTypeResolver';
import {
	ForeignKeyColumnCode,
	IdColumnCode,
	RegularColumnCode
} from '@/erdiagram/generator/database/code-converter/sql/dialect/common/sql-script-types';
import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/model/database-model-types';

export default class OracleDialect implements SqlDialect {

	private readonly tableNameCaseConverter: CaseConverter;

	private readonly columnCodeGenerator: OracleColumnCodeGenerator;
	private readonly idColumnCodeGenerator: OracleIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: OracleForeignColumnCodeGenerator;

	constructor(config?: Partial<OracleDialectConfig>) {

		const fullConfig = oracleDialectConfigManager.mergeWithDefaultConfig(config);

		this.tableNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				fullConfig.tableNameCaseFormat
		);

		const columnNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				fullConfig.columnNameCaseFormat
		);

		const sqlTypeResolver = new SqlTypeResolver(fullConfig.typeBindings);

		this.columnCodeGenerator = new OracleColumnCodeGenerator(
				sqlTypeResolver,
				columnNameCaseConverter
		);

		this.idColumnCodeGenerator = new OracleIdColumnCodeGenerator(
				sqlTypeResolver,
				columnNameCaseConverter
		);

		this.foreignColumnCodeGenerator = new OracleForeignColumnCodeGenerator(
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
		return `ALTER TABLE "${outputTableName}" ADD ${constraintCode};`;
	}

}
