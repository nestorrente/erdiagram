import {PartialDatabaseModelConfig} from '@/erdiagram/converter/database/model/config/DatabaseModelConfig';
import SqlDialect from '@/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlDialect';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import SqlSourceCodeGenerator from '@/erdiagram/converter/database/source-code-generator/SqlSourceCodeGenerator';
import DatabaseModelToSqlCodeConverter
	from '@/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter';

export default class SqlSourceCodeGeneratorBuilder {

	private _databaseModelConfig: PartialDatabaseModelConfig = {};
	private _sqlDialect?: SqlDialect;

	public configureDatabaseModel(config: PartialDatabaseModelConfig) {
		this._databaseModelConfig = config;
		return this;
	}

	public useDialect(sqlDialect: SqlDialect) {
		this._sqlDialect = sqlDialect;
		return this;
	}

	public build() {

		if (this._sqlDialect == null) {
			throw new Error('SqlDialect is not configured');
		}

		return new SqlSourceCodeGenerator(
				new DatabaseModelGenerator(this._databaseModelConfig),
				new DatabaseModelToSqlCodeConverter(this._sqlDialect)
		);

	}

}
