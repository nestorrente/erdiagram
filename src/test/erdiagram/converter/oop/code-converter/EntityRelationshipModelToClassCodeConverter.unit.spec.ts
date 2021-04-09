import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import EntityRelationshipModelToClassCodeConverter
	from '@/erdiagram/converter/oop/code-converter/EntityRelationshipModelToClassCodeConverter';

test('convertToCode() calls dependencies', () => {

	const mockValues = {

		entityRelationshipModel: <EntityRelationshipModel>{
			entities: [],
			relationships: []
		},

		classModel: <ClassModel>{
			classes: []
		},

		outputCode: 'Output_code'

	}

	const classModelGeneratorMock = {
		generateClassModel: jest.fn(() => mockValues.classModel)
	};

	const convertToCodeMockFunction = jest.fn(() => mockValues.outputCode);

	const classModelToCodeConverterMock = {
		convertToCode: convertToCodeMockFunction
	};

	const entityRelationshipModelToClassCodeConverter = new EntityRelationshipModelToClassCodeConverter(
			classModelGeneratorMock as unknown as ClassModelGenerator,
			classModelToCodeConverterMock
	);

	const result = entityRelationshipModelToClassCodeConverter.convertToCode(mockValues.entityRelationshipModel);

	expect(result).toBe(mockValues.outputCode);

	const generateClassModelCalls = classModelGeneratorMock.generateClassModel.mock.calls;
	expect(generateClassModelCalls.length).toBe(1);

	const generateClassModelCallArgs = generateClassModelCalls[0] as any[];
	expect(generateClassModelCallArgs[0]).toBe(mockValues.entityRelationshipModel);

	const convertToCodeCalls = classModelToCodeConverterMock.convertToCode.mock.calls;
	expect(convertToCodeCalls.length).toBe(1);

	const convertToCodeCallArgs = convertToCodeCalls[0] as any[];
	expect(convertToCodeCallArgs[0]).toBe(mockValues.classModel);

});
