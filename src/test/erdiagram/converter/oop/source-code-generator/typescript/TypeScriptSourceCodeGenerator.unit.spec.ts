import {checkAllMockCalls, createMockProxy} from '#/erdiagram/util/jest-utils';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import {EntityPropertyType, EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import {createClass, createPrimitiveClassField} from '#/erdiagram/converter/oop/model/class-model-mothers';
import TypeScriptSourceCodeGenerator
	from '@/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGenerator';
import TypeScriptClassModelToCodeConverter
	from '@/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptClassModelToCodeConverter';

const classModelGeneratorMock = createMockProxy<ClassModelGenerator>();
const typeScriptClassModelToCodeConverter = createMockProxy<TypeScriptClassModelToCodeConverter>();

const typeScriptSourceCodeGenerator = new TypeScriptSourceCodeGenerator(
		classModelGeneratorMock,
		typeScriptClassModelToCodeConverter
);

afterEach(() => jest.clearAllMocks());

describe('Dependencies are called as expected', () => {

	test('Generate code', () => {

		// Given

		const entityRelationshipModel: EntityRelationshipModel = {entities: [], relationships: []};

		const fieldDescriptor = createPrimitiveClassField('id', EntityPropertyType.IDENTITY);
		const classDescriptor = createClass('MyClass', {fields: [fieldDescriptor]});
		const classModel: ClassModel = {classes: [classDescriptor]};

		// Setup mocks

		classModelGeneratorMock.generateClassModel.mockReturnValue(classModel);
		typeScriptClassModelToCodeConverter.convertToCode.mockReturnValue('/* output code */');

		// When

		const result = typeScriptSourceCodeGenerator.generateSourceCode(entityRelationshipModel);

		// Then

		expect(result).toBe('/* output code */');

		checkAllMockCalls(classModelGeneratorMock.generateClassModel, [
			[entityRelationshipModel]
		]);

		checkAllMockCalls(typeScriptClassModelToCodeConverter.convertToCode, [
			[classModel]
		]);

	});

});
