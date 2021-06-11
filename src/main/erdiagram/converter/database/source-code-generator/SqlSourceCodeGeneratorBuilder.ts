import {PartialDatabaseModelConfig} from '@/erdiagram/converter/database/model/config/DatabaseModelConfig';
import SqlDialect from '@/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlDialect';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import SqlSourceCodeGenerator from '@/erdiagram/converter/database/source-code-generator/SqlSourceCodeGenerator';
import DatabaseModelToSqlCodeConverter
	from '@/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter';

export default class SqlSourceCodeGeneratorBuilder {

	private readonly _sqlDialect: SqlDialect;
	private _databaseModelConfig: PartialDatabaseModelConfig = {};

	constructor(sqlDialect: SqlDialect) {
		this._sqlDialect = sqlDialect;
	}

	public configureDatabaseModel(config: PartialDatabaseModelConfig) {
		this._databaseModelConfig = config;
		return this;
	}

	public build() {
		return new SqlSourceCodeGenerator(
				new DatabaseModelGenerator(this._databaseModelConfig),
				new DatabaseModelToSqlCodeConverter(this._sqlDialect)
		);
	}

}
