import SqlServerDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterConfig';
import AbstractSqlDatabaseModelToCodeConverter
	from '@/erdiagram/generator/database/code-converter/AbstractSqlDatabaseModelToCodeConverter';
import SqlServerDialect from '@/erdiagram/generator/database/code-converter/sqlserver/SqlServerDialect';

export default class SqlServerDatabaseModelToCodeConverter extends AbstractSqlDatabaseModelToCodeConverter {

	constructor(config?: Partial<SqlServerDatabaseModelToCodeConverterConfig>) {
		super(new SqlServerDialect(config));
	}

}
