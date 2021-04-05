import MysqlDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfig';
import MysqlDialect from '@/erdiagram/generator/database/code-converter/mysql/MysqlDialect';
import AbstractSqlDatabaseModelToCodeConverter
	from '@/erdiagram/generator/database/code-converter/AbstractSqlDatabaseModelToCodeConverter';

export default class MysqlDatabaseModelToCodeConverter extends AbstractSqlDatabaseModelToCodeConverter {

	constructor(config?: Partial<MysqlDatabaseModelToCodeConverterConfig>) {
		super(new MysqlDialect(config));
	}

}
