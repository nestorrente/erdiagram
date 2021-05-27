import {SetupContext} from '@/erdiagram/converter/oop/code-converter/java/model/transformer/java-class-model-transformer-context-types';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import JpaTransformerSetupData
	from '@/erdiagram/converter/oop/code-converter/java/jpa/transformer/setup/JpaTransformerSetupData';

export default class JpaTransformerSetupDataGenerator {

	readonly #databaseModelGenerator: DatabaseModelGenerator;

	constructor(databaseModelGenerator: DatabaseModelGenerator) {
		this.#databaseModelGenerator = databaseModelGenerator;
	}

	setup(context: SetupContext): JpaTransformerSetupData {
		return {
			databaseModel: this.#databaseModelGenerator.generateDatabaseModel(context.entityRelationshipModel)
		};
	}

}
