import {checkAllMockCalls, createMockProxy} from '#/erdiagram/util/jest-utils';
import {EntityPropertyType, EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import SqlSourceCodeGenerator from '@/erdiagram/converter/database/source-code-generator/SqlSourceCodeGenerator';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import DatabaseModelToSqlCodeConverter
	from '@/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter';
import {DatabaseModel} from '@/erdiagram/converter/database/model/database-model-types';
import {createEntityTable, createTableColumn} from '#/erdiagram/converter/database/model/database-model-mothers';

const databaseModelGeneratorMock = createMockProxy<DatabaseModelGenerator>();
const databaseModelToCodeConverter = createMockProxy<DatabaseModelToSqlCodeConverter>();

const sqlSourceCodeGenerator = new SqlSourceCodeGenerator(
		databaseModelGeneratorMock,
		databaseModelToCodeConverter
);

afterEach(() => jest.clearAllMocks());

describe('Dependencies are called as expected', () => {

	test('Generate code', () => {

		// Given

		const entityRelationshipModel: EntityRelationshipModel = {entities: [], relationships: []};

		const columnDescriptor = createTableColumn('id', EntityPropertyType.IDENTITY);
		const tableDescriptor = createEntityTable('MyEntity', {columns: [columnDescriptor]});
		const databaseModel: DatabaseModel = {tables: [tableDescriptor]};

		// Setup mocks

		databaseModelGeneratorMock.generateDatabaseModel.mockReturnValue(databaseModel);
		databaseModelToCodeConverter.convertToCode.mockReturnValue('/* output code */');

		// When

		const result = sqlSourceCodeGenerator.generateSourceCode(entityRelationshipModel);

		// Then

		expect(result).toBe('/* output code */');

		checkAllMockCalls(databaseModelGeneratorMock.generateDatabaseModel, [
			[entityRelationshipModel]
		]);

		checkAllMockCalls(databaseModelToCodeConverter.convertToCode, [
			[databaseModel]
		]);

	});

});
