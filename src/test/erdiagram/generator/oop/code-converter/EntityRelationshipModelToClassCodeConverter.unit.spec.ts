import ClassModelGenerator from '@/erdiagram/generator/oop/model/ClassModelGenerator';
import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';
import {ClassModel} from '@/erdiagram/generator/oop/model/class-model-types';
import EntityRelationshipModelToClassCodeConverter
	from '@/erdiagram/generator/oop/code-converter/EntityRelationshipModelToClassCodeConverter';
import ClassModelToCodeConverter from '@/erdiagram/generator/oop/code-converter/ClassModelToCodeConverter';

test('convertToCode() calls dependencies', () => {

	const mockValues = {

		entityRelationshipModel: {
			entities: [],
			relationships: []
		} as EntityRelationshipModel,

		classModel: {
			classes: []
		} as ClassModel,

		outputCode: 'Output_code'

	}

	const generateClassModelMockFunction = jest.fn(() => mockValues.classModel);

	const classModelGeneratorMock = {
		generateClassModel: generateClassModelMockFunction
	} as unknown as ClassModelGenerator;

	const convertToCodeMockFunction = jest.fn(() => mockValues.outputCode);

	const classModelToCodeConverterMock = {
		convertToCode: convertToCodeMockFunction
	} as unknown as ClassModelToCodeConverter;

	const entityRelationshipModelToClassCodeConverter = new EntityRelationshipModelToClassCodeConverter(
			classModelGeneratorMock,
			classModelToCodeConverterMock
	);

	const result = entityRelationshipModelToClassCodeConverter.convertToCode(mockValues.entityRelationshipModel);

	expect(result).toBe(mockValues.outputCode);

	const generateClassModelCalls = generateClassModelMockFunction.mock.calls;
	expect(generateClassModelCalls.length).toBe(1);

	const generateClassModelCallArgs = generateClassModelCalls[0] as any[];
	expect(generateClassModelCallArgs[0]).toBe(mockValues.entityRelationshipModel);

	const convertToCodeCalls = convertToCodeMockFunction.mock.calls;
	expect(convertToCodeCalls.length).toBe(1);

	const convertToCodeCallArgs = convertToCodeCalls[0] as any[];
	expect(convertToCodeCallArgs[0]).toBe(mockValues.classModel);

});
