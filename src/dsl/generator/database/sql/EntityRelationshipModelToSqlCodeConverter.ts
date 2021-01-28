import {EntityRelationshipModel} from '@/dsl/parser/er-model-parser';
import databaseModelGenerator from '@/dsl/generator/database/database-model/DatabaseModelGenerator';
import DatabaseModelToCodeConverter from '@/dsl/generator/database/sql/DatabaseModelToCodeConverter';
import EntityRelationshipModelToCodeConverter from '@/dsl/generator/entity-relationship-to-code-converter';

export default class EntityRelationshipModelToSqlCodeConverter implements EntityRelationshipModelToCodeConverter {

	private readonly databaseModelToCodeConverter: DatabaseModelToCodeConverter;

	constructor(databaseModelToCodeConverter: DatabaseModelToCodeConverter) {
		this.databaseModelToCodeConverter = databaseModelToCodeConverter;
	}

	public generateCode(entityRelationshipModel: EntityRelationshipModel): string {
		const databaseModel = databaseModelGenerator.generateDatabaseModel(entityRelationshipModel);
		return this.databaseModelToCodeConverter.generateCode(databaseModel);
	}

}
