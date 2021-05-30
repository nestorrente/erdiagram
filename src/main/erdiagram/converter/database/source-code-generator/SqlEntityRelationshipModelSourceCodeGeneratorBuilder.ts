import {PartialDatabaseModelGeneratorConfig} from '@/erdiagram/converter/database/model/config/DatabaseModelGeneratorConfig';
import SqlDialect from '@/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlDialect';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import SqlEntityRelationshipModelSourceCodeGenerator
	from '@/erdiagram/converter/database/source-code-generator/SqlEntityRelationshipModelSourceCodeGenerator';
import DatabaseModelToSqlCodeConverter
	from '@/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter';

export default class SqlEntityRelationshipModelSourceCodeGeneratorBuilder {

	#databaseModelGeneratorConfig: PartialDatabaseModelGeneratorConfig = {};
	#sqlDialect?: SqlDialect;

	public configureDatabaseModel(config: PartialDatabaseModelGeneratorConfig) {
		this.#databaseModelGeneratorConfig = config;
		return this;
	}

	public useDialect(sqlDialect: SqlDialect) {
		this.#sqlDialect = sqlDialect;
		return this;
	}

	public build() {

		if (this.#sqlDialect == null) {
			throw new Error('SqlDialect is not configured');
		}

		return new SqlEntityRelationshipModelSourceCodeGenerator(
				new DatabaseModelGenerator(this.#databaseModelGeneratorConfig),
				new DatabaseModelToSqlCodeConverter(this.#sqlDialect)
		);

	}

}
