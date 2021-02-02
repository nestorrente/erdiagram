import databaseModelGenerator from '@/erdiagram/generator/database/model/DatabaseModelGenerator';
import DatabaseModelToCodeConverter from '@/erdiagram/generator/database/code-converter/DatabaseModelToCodeConverter';
import EntityRelationshipModelToCodeConverter from '@/erdiagram/generator/EntityRelationshipModelToCodeConverter';
import EntityRelationshipModel from '@/erdiagram/parser/EntityRelationshipModel';

export default class EntityRelationshipModelToDatabaseCodeConverter implements EntityRelationshipModelToCodeConverter {

	private readonly databaseModelToCodeConverter: DatabaseModelToCodeConverter;

	constructor(databaseModelToCodeConverter: DatabaseModelToCodeConverter) {
		this.databaseModelToCodeConverter = databaseModelToCodeConverter;
	}

	public generateCode(entityRelationshipModel: EntityRelationshipModel): string {
		const databaseModel = databaseModelGenerator.generateDatabaseModel(entityRelationshipModel);
		return this.databaseModelToCodeConverter.generateCode(databaseModel);
	}

}
