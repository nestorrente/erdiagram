import SqlDialect from '@/erdiagram/generator/database/code-converter/common/SqlDialect';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import OracleColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/oracle/column/OracleColumnCodeGenerator';
import OracleIdColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/oracle/column/OracleIdColumnCodeGenerator';
import OracleForeignColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/oracle/column/OracleForeignColumnCodeGenerator';
import OracleDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/oracle/config/OracleDatabaseModelToCodeConverterConfig';
import oracleDatabaseModelToCodeConverterConfigManager
	from '@/erdiagram/generator/database/code-converter/oracle/config/OracleDatabaseModelToCodeConverterConfigManager';
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

export default class OracleDialect implements SqlDialect {

	private readonly tableNameCaseConverter: CaseConverter;

	private readonly columnCodeGenerator: OracleColumnCodeGenerator;
	private readonly idColumnCodeGenerator: OracleIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: OracleForeignColumnCodeGenerator;

	constructor(config?: Partial<OracleDatabaseModelToCodeConverterConfig>) {

		const fullConfig = oracleDatabaseModelToCodeConverterConfigManager.mergeWithDefaultConfig(config);

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
				this.columnCodeGenerator,
				columnNameCaseConverter
		);

		this.foreignColumnCodeGenerator = new OracleForeignColumnCodeGenerator(
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
