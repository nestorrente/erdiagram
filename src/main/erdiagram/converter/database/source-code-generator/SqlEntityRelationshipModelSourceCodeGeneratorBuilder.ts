import {PartialDatabaseModelGeneratorConfig} from '@/erdiagram/converter/database/model/config/DatabaseModelGeneratorConfig';
import SqlDialect from '@/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlDialect';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import SqlEntityRelationshipModelSourceCodeGenerator
	from '@/erdiagram/converter/database/source-code-generator/SqlEntityRelationshipModelSourceCodeGenerator';
import DatabaseModelToSqlCodeConverter
	from '@/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter';

export default class SqlEntityRelationshipModelSourceCodeGeneratorBuilder {

	private _databaseModelGeneratorConfig: PartialDatabaseModelGeneratorConfig = {};
	private _sqlDialect?: SqlDialect;

	public configureDatabaseModel(config: PartialDatabaseModelGeneratorConfig) {
		this._databaseModelGeneratorConfig = config;
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

		return new SqlEntityRelationshipModelSourceCodeGenerator(
				new DatabaseModelGenerator(this._databaseModelGeneratorConfig),
				new DatabaseModelToSqlCodeConverter(this._sqlDialect)
		);

	}

}
