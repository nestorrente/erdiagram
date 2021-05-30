import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {DatabaseModel} from '@/erdiagram/converter/database/model/database-model-types';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import SqlEntityRelationshipModelSourceCodeGenerator
	from '@/erdiagram/converter/database/source-code-generator/SqlEntityRelationshipModelSourceCodeGenerator';
import DatabaseModelToSqlCodeConverter
	from '@/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter';

test('convertToCode() calls dependencies', () => {

	const mockValues = {

		entityRelationshipModel: <EntityRelationshipModel>{
			entities: [],
			relationships: []
		},

		databaseModel: <DatabaseModel>{
			tables: []
		},

		outputCode: 'Output_code'

	};

	const databaseModelGeneratorMock = {
		generateDatabaseModel: jest.fn(() => mockValues.databaseModel)
	};

	const convertToCodeMockFunction = jest.fn(() => mockValues.outputCode);

	const databaseModelToSqlCodeConverterMock = {
		convertToCode: convertToCodeMockFunction
	};

	const entityRelationshipModelToDatabaseCodeConverter = new SqlEntityRelationshipModelSourceCodeGenerator(
			databaseModelGeneratorMock as unknown as DatabaseModelGenerator,
			databaseModelToSqlCodeConverterMock as unknown as DatabaseModelToSqlCodeConverter
	);

	const result = entityRelationshipModelToDatabaseCodeConverter.generateSourceCode(mockValues.entityRelationshipModel);

	expect(result).toBe(mockValues.outputCode);

	const generateDatabaseModelCalls = databaseModelGeneratorMock.generateDatabaseModel.mock.calls;
	expect(generateDatabaseModelCalls).toHaveLength(1);

	const generateDatabaseModelCallArgs = generateDatabaseModelCalls[0] as any[];
	expect(generateDatabaseModelCallArgs[0]).toBe(mockValues.entityRelationshipModel);

	const convertToCodeCalls = databaseModelToSqlCodeConverterMock.convertToCode.mock.calls;
	expect(convertToCodeCalls).toHaveLength(1);

	const convertToCodeCallArgs = convertToCodeCalls[0] as any[];
	expect(convertToCodeCallArgs[0]).toBe(mockValues.databaseModel);

});
