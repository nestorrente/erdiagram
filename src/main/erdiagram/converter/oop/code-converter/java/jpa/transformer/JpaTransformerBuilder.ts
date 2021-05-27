import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import {PartialDatabaseModelGeneratorConfig} from '@/erdiagram/converter/database/model/config/DatabaseModelGeneratorConfig';
import {PartialJpaTransformerConfig} from '@/erdiagram/converter/oop/code-converter/java/jpa/config/JpaTransformerConfig';
import {JpaTransformer} from '@/erdiagram/converter/oop/code-converter/java/jpa/transformer/JpaTransformer';

export default class JpaTransformerBuilder {

	#databaseModelGeneratorConfig: PartialDatabaseModelGeneratorConfig = {};
	#config: PartialJpaTransformerConfig = {};

	public withDatabaseModelGeneratorConfig(config: PartialDatabaseModelGeneratorConfig) {
		this.#databaseModelGeneratorConfig = config;
		return this;
	}

	public withConfig(config: PartialJpaTransformerConfig) {
		this.#config = config;
		return this;
	}

	public build() {
		return new JpaTransformer(
				new DatabaseModelGenerator(this.#databaseModelGeneratorConfig),
				this.#config
		);
	}

}
