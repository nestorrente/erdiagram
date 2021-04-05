import SqlDialect from '@/erdiagram/generator/database/code-converter/common/SqlDialect';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import SqlServerColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerColumnCodeGenerator';
import SqlServerIdColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerIdColumnCodeGenerator';
import SqlServerForeignColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerForeignColumnCodeGenerator';
import SqlServerDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterConfig';
import sqlServerDatabaseModelToCodeConverterConfigManager
	from '@/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterConfigManager';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import SqlTypeResolver from '@/erdiagram/generator/database/code-converter/common/SqlTypeResolver';
import {
	ForeignKeyColumnCode,
	IdColumnCode,
	RegularColumnCode
} from '@/erdiagram/generator/database/code-converter/common/sql-script-types';
import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/model/database-model-types';

export default class SqlServerDialect implements SqlDialect {

	private readonly tableNameCaseConverter: CaseConverter;

	private readonly columnCodeGenerator: SqlServerColumnCodeGenerator;
	private readonly idColumnCodeGenerator: SqlServerIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: SqlServerForeignColumnCodeGenerator;

	constructor(config?: Partial<SqlServerDatabaseModelToCodeConverterConfig>) {

		const fullConfig = sqlServerDatabaseModelToCodeConverterConfigManager.mergeWithDefaultConfig(config);

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
				this.columnCodeGenerator,
				columnNameCaseConverter
		);

		this.foreignColumnCodeGenerator = new SqlServerForeignColumnCodeGenerator(
				this.columnCodeGenerator,
				this.tableNameCaseConverter,
				columnNameCaseConverter
		);

	}

	startTable(tableName: string) {
		const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
		return `CREATE TABLE "${outputTableName}" (`;
	}

	endTable() {
		return ');';
	}

	addIdColumn(tableName: string, identifierColumnName: string): IdColumnCode {
		const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
		return this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, identifierColumnName);
	}

	addColumn(tableName: string, column: TableColumnDescriptor): RegularColumnCode {
		const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
		return this.columnCodeGenerator.generateColumnCode(outputTableName, column);
	}

	addForeignColumn(tableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode {
		const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
		return this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);
	}

	addConstraint(tableName: string, constraintCode: string) {
		const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
		return `ALTER TABLE "${outputTableName}" ADD ${constraintCode};`;
	}

}
