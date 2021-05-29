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

	};

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

	expect(classModelGeneratorMock.generateClassModel).toHaveBeenCalledTimes(1);
	expect(classModelGeneratorMock.generateClassModel).toHaveBeenCalledWith(mockValues.entityRelationshipModel);

	expect(classModelToCodeConverterMock.convertToCode).toHaveBeenCalledTimes(1);
	expect(classModelToCodeConverterMock.convertToCode).toHaveBeenCalledWith(mockValues.classModel);

});
