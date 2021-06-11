import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import SourceCodeGenerator from '@/erdiagram/converter/SourceCodeGenerator';
import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import DatabaseModelToSqlCodeConverter
	from '@/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter';
import SqlSourceCodeGeneratorBuilder
	from '@/erdiagram/converter/database/source-code-generator/SqlSourceCodeGeneratorBuilder';
import SqlDialect from '@/erdiagram/converter/database/source-code-generator/sql/dialect/common/SqlDialect';

export default class SqlSourceCodeGenerator implements SourceCodeGenerator {

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

	static withDefaultConfig(sqlDialect: SqlDialect) {
		return this.builder(sqlDialect).build();
	}

	static builder(sqlDialect: SqlDialect) {
		return new SqlSourceCodeGeneratorBuilder(sqlDialect);
	}

}
