import PostgresqlDialect from '@/erdiagram/generator/database/code-converter/postgresql/PostgresqlDialect';
import PostgresqlDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/postgresql/config/PostgresqlDatabaseModelToCodeConverterConfig';
import AbstractSqlDatabaseModelToCodeConverter
	from '@/erdiagram/generator/database/code-converter/AbstractSqlDatabaseModelToCodeConverter';

export default class PostgresqlDatabaseModelToCodeConverter extends AbstractSqlDatabaseModelToCodeConverter {

	constructor(config?: Partial<PostgresqlDatabaseModelToCodeConverterConfig>) {
		super(new PostgresqlDialect(config));
	}

}
