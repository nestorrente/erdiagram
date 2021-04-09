import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import DatabaseModelToCodeConverter from '@/erdiagram/converter/database/code-converter/DatabaseModelToCodeConverter';
import EntityRelationshipModelToCodeConverter from '@/erdiagram/converter/EntityRelationshipModelToCodeConverter';
import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default class EntityRelationshipModelToDatabaseCodeConverter implements EntityRelationshipModelToCodeConverter {

	private readonly databaseModelGenerator: DatabaseModelGenerator;
	private readonly databaseModelToCodeConverter: DatabaseModelToCodeConverter;

	constructor(
			databaseModelGenerator: DatabaseModelGenerator,
			databaseModelToCodeConverter: DatabaseModelToCodeConverter
	) {
		this.databaseModelGenerator = databaseModelGenerator;
		this.databaseModelToCodeConverter = databaseModelToCodeConverter;
	}

	public convertToCode(entityRelationshipModel: EntityRelationshipModel): string {
		const databaseModel = this.databaseModelGenerator.generateDatabaseModel(entityRelationshipModel);
		return this.databaseModelToCodeConverter.convertToCode(databaseModel);
	}

}
