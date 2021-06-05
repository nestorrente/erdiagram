import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {DatabaseModel} from '@/erdiagram/converter/database/model/database-model-types';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import SqlSourceCodeGenerator
	from '../../../../../main/erdiagram/converter/database/source-code-generator/SqlSourceCodeGenerator';
import DatabaseModelToSqlCodeConverter
	from '@/erdiagram/converter/database/source-code-generator/sql/DatabaseModelToSqlCodeConverter';
import {createMockObject} from '#/erdiagram/util/jest-utils';

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

	const databaseModelGeneratorMock = createMockObject<DatabaseModelGenerator>({
		generateDatabaseModel: jest.fn((model) => mockValues.databaseModel)
	});

	const databaseModelToSqlCodeConverterMock = createMockObject<DatabaseModelToSqlCodeConverter>({
		convertToCode: jest.fn((model) => mockValues.outputCode)
	});

	const entityRelationshipModelToDatabaseCodeConverter = new SqlSourceCodeGenerator(
			databaseModelGeneratorMock,
			databaseModelToSqlCodeConverterMock
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
