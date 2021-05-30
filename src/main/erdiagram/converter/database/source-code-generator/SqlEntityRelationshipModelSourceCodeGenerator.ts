import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import EntityRelationshipModelSourceCodeGenerator
	from '@/erdiagram/converter/EntityRelationshipModelSourceCodeGenerator';
import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import DatabaseModelToSqlCodeConverter
	from '@/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter';
import SqlEntityRelationshipModelSourceCodeGeneratorBuilder
	from '@/erdiagram/converter/database/source-code-generator/SqlEntityRelationshipModelSourceCodeGeneratorBuilder';

export default class SqlEntityRelationshipModelSourceCodeGenerator implements EntityRelationshipModelSourceCodeGenerator {

	private readonly databaseModelGenerator: DatabaseModelGenerator;
	private readonly databaseModelToSqlCodeConverter: DatabaseModelToSqlCodeConverter;

	constructor(
			databaseModelGenerator: DatabaseModelGenerator,
			databaseModelToSqlCodeConverter: DatabaseModelToSqlCodeConverter
	) {
		this.databaseModelGenerator = databaseModelGenerator;
		this.databaseModelToSqlCodeConverter = databaseModelToSqlCodeConverter;
	}

	public generateSourceCode(entityRelationshipModel: EntityRelationshipModel): string {
		const databaseModel = this.databaseModelGenerator.generateDatabaseModel(entityRelationshipModel);
		return this.databaseModelToSqlCodeConverter.convertToCode(databaseModel);
	}

	static withDefaultConfig() {
		return this.builder().build();
	}

	static builder() {
		return new SqlEntityRelationshipModelSourceCodeGeneratorBuilder();
	}

}
