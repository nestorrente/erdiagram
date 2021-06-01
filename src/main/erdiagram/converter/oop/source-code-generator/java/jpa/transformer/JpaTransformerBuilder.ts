import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import {PartialDatabaseModelGeneratorConfig} from '@/erdiagram/converter/database/model/config/DatabaseModelGeneratorConfig';
import {PartialJpaTransformerConfig} from '@/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaTransformerConfig';
import {JpaTransformer} from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformer';

export default class JpaTransformerBuilder {

	private _databaseModelGeneratorConfig: PartialDatabaseModelGeneratorConfig = {};
	private _config: PartialJpaTransformerConfig = {};

	public configureDatabaseModel(config: PartialDatabaseModelGeneratorConfig) {
		this._databaseModelGeneratorConfig = config;
		return this;
	}

	public configureJpa(config: PartialJpaTransformerConfig) {
		this._config = config;
		return this;
	}

	public build() {
		return new JpaTransformer(
				new DatabaseModelGenerator(this._databaseModelGeneratorConfig),
				this._config
		);
	}

}
