import OracleDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/oracle/config/OracleDatabaseModelToCodeConverterConfig';
import AbstractSqlDatabaseModelToCodeConverter
	from '@/erdiagram/generator/database/code-converter/AbstractSqlDatabaseModelToCodeConverter';
import OracleDialect from '@/erdiagram/generator/database/code-converter/oracle/OracleDialect';

export default class OracleDatabaseModelToCodeConverter extends AbstractSqlDatabaseModelToCodeConverter {

	constructor(config?: Partial<OracleDatabaseModelToCodeConverterConfig>) {
		super(new OracleDialect(config));
	}

}
