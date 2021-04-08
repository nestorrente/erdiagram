import SqlDialect from '@/erdiagram/generator/database/code-converter/sql/dialect/common/SqlDialect';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
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
import PostgresqlColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sql/dialect/postgresql/column/PostgresqlColumnCodeGenerator';
import PostgresqlIdColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sql/dialect/postgresql/column/PostgresqlIdColumnCodeGenerator';
import PostgresqlForeignColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sql/dialect/postgresql/column/PostgresqlForeignColumnCodeGenerator';
import PostgresqlDialectConfig
	from '@/erdiagram/generator/database/code-converter/sql/dialect/postgresql/config/PostgresqlDialectConfig';
import postgresqlDatabaseModelToCodeConverterConfigManager
	from '@/erdiagram/generator/database/code-converter/sql/dialect/postgresql/config/PostgresqlDialectConfigManager';

export default class PostgresqlDialect implements SqlDialect {

	private readonly tableNameCaseConverter: CaseConverter;

	private readonly columnCodeGenerator: PostgresqlColumnCodeGenerator;
	private readonly idColumnCodeGenerator: PostgresqlIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: PostgresqlForeignColumnCodeGenerator;

	constructor(config?: Partial<PostgresqlDialectConfig>) {

		const fullConfig = postgresqlDatabaseModelToCodeConverterConfigManager.mergeWithDefaultConfig(config);

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
				this.columnCodeGenerator,
				columnNameCaseConverter
		);

		this.foreignColumnCodeGenerator = new PostgresqlForeignColumnCodeGenerator(
				this.columnCodeGenerator,
				this.tableNameCaseConverter,
				columnNameCaseConverter
		);

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
