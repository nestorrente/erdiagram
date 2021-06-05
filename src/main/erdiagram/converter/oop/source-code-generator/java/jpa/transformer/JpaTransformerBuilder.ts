import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import {PartialDatabaseModelConfig} from '@/erdiagram/converter/database/model/config/DatabaseModelConfig';
import {PartialJpaConfig} from '@/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaConfig';
import {JpaTransformer} from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformer';

export default class JpaTransformerBuilder {

	private _databaseModelConfig: PartialDatabaseModelConfig = {};
	private _config: PartialJpaConfig = {};

	public configureDatabaseModel(config: PartialDatabaseModelConfig) {
		this._databaseModelConfig = config;
		return this;
	}

	public configureJpa(config: PartialJpaConfig) {
		this._config = config;
		return this;
	}

	public build() {
		return new JpaTransformer(
				new DatabaseModelGenerator(this._databaseModelConfig),
				this._config
		);
	}

}
