import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {DatabaseModel} from '@/erdiagram/converter/database/model/database-model-types';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import EntityRelationshipModelToDatabaseCodeConverter
	from '@/erdiagram/converter/database/code-converter/EntityRelationshipModelToDatabaseCodeConverter';

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

	}

	const databaseModelGeneratorMock = {
		generateDatabaseModel: jest.fn(() => mockValues.databaseModel)
	};

	const convertToCodeMockFunction = jest.fn(() => mockValues.outputCode);

	const databaseModelToCodeConverterMock = {
		convertToCode: convertToCodeMockFunction
	};

	const entityRelationshipModelToDatabaseCodeConverter = new EntityRelationshipModelToDatabaseCodeConverter(
			databaseModelGeneratorMock as unknown as DatabaseModelGenerator,
			databaseModelToCodeConverterMock
	);

	const result = entityRelationshipModelToDatabaseCodeConverter.convertToCode(mockValues.entityRelationshipModel);

	expect(result).toBe(mockValues.outputCode);

	const generateDatabaseModelCalls = databaseModelGeneratorMock.generateDatabaseModel.mock.calls;
	expect(generateDatabaseModelCalls.length).toBe(1);

	const generateDatabaseModelCallArgs = generateDatabaseModelCalls[0] as any[];
	expect(generateDatabaseModelCallArgs[0]).toBe(mockValues.entityRelationshipModel);

	const convertToCodeCalls = databaseModelToCodeConverterMock.convertToCode.mock.calls;
	expect(convertToCodeCalls.length).toBe(1);

	const convertToCodeCallArgs = convertToCodeCalls[0] as any[];
	expect(convertToCodeCallArgs[0]).toBe(mockValues.databaseModel);

});
