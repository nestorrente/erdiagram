import DatabaseModelGenerator from '@/erdiagram/generator/database/model/DatabaseModelGenerator';
import DatabaseModelToCodeConverter from '@/erdiagram/generator/database/code-converter/DatabaseModelToCodeConverter';
import EntityRelationshipModelToCodeConverter from '@/erdiagram/generator/EntityRelationshipModelToCodeConverter';
import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';

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
