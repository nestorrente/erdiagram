import SqlDialect from '@/erdiagram/generator/database/code-converter/common/SqlDialect';
import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/model/database-model-types';
import {
	ForeignKeyColumnCode,
	IdColumnCode,
	RegularColumnCode
} from '@/erdiagram/generator/database/code-converter/common/sql-script-types';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import MysqlColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/mysql/column/MysqlColumnCodeGenerator';
import MysqlIdColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/mysql/column/MysqlIdColumnCodeGenerator';
import MysqlForeignColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/mysql/column/MysqlForeignColumnCodeGenerator';
import SqlTypeResolver from '@/erdiagram/generator/database/code-converter/common/SqlTypeResolver';
import mysqlDatabaseModelToCodeConverterConfigManager
	from '@/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfigManager';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import MysqlDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfig';

export default class MysqlDialect implements SqlDialect {

	private readonly tableNameCaseConverter: CaseConverter;

	private readonly columnCodeGenerator: MysqlColumnCodeGenerator;
	private readonly idColumnCodeGenerator: MysqlIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: MysqlForeignColumnCodeGenerator;

	constructor(config?: Partial<MysqlDatabaseModelToCodeConverterConfig>) {

		const fullConfig = mysqlDatabaseModelToCodeConverterConfigManager.mergeWithDefaultConfig(config);

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
				this.columnCodeGenerator,
				columnNameCaseConverter
		);

		this.foreignColumnCodeGenerator = new MysqlForeignColumnCodeGenerator(
				this.columnCodeGenerator,
				this.tableNameCaseConverter,
				columnNameCaseConverter
		);

	}

	startTable(tableName: string) {
		const outputTableName = this.tableNameCaseConverter.convertCase(tableName);
		return `CREATE TABLE \`${outputTableName}\` (`;
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
		return `ALTER TABLE \`${outputTableName}\` ADD ${constraintCode};`;
	}

}
