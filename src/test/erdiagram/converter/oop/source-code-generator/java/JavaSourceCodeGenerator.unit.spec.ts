import JavaSourceCodeGenerator from '@/erdiagram/converter/oop/source-code-generator/java/JavaSourceCodeGenerator';
import {checkAllMockCalls, createMockProxy} from '#/erdiagram/util/jest-utils';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import {EntityPropertyType, EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import JavaClassModelGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator';
import JavaClassModelDescriptorsRepository
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepository';
import {JavaClassModel} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/JavaClassModelTransformer';
import JavaClassModelCodeGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelCodeGenerator';
import JavaClassModelSourceFilesGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelSourceFilesGenerator';
import {
	createJavaClass,
	createJavaField
} from '#/erdiagram/converter/oop/source-code-generator/java/model/generator/source/java-class-model-mothers';
import {createClass, createPrimitiveClassField} from '#/erdiagram/converter/oop/model/class-model-mothers';
import SourceFileInfo from '@/erdiagram/converter/common/SourceFileInfo';

const classModelGeneratorMock = createMockProxy<ClassModelGenerator>();
const javaClassModelDescriptorsRepository = createMockProxy<JavaClassModelDescriptorsRepository>();
const javaClassModelGeneratorMock = createMockProxy<JavaClassModelGenerator>();
const javaClassModelTransformerMock = createMockProxy<JavaClassModelTransformer<string>>();
const javaClassModelCodeGeneratorMock = createMockProxy<JavaClassModelCodeGenerator>();
const javaClassModelSourceFilesGeneratorMock = createMockProxy<JavaClassModelSourceFilesGenerator>();

const javaSourceCodeGenerator = new JavaSourceCodeGenerator(
		classModelGeneratorMock,
		javaClassModelGeneratorMock,
		[javaClassModelTransformerMock],
		javaClassModelCodeGeneratorMock,
		javaClassModelSourceFilesGeneratorMock
);

afterEach(() => jest.clearAllMocks());

describe('Dependencies are called as expected', () => {

	test('Generate code', () => {

		// Given

		const commonTestData = getCommonTestData();

		const {
			entityRelationshipModel,
			javaClassModel
		} = commonTestData;

		// Setup mocks

		setupCommonMocks(commonTestData);

		javaClassModelCodeGeneratorMock.generateCode.mockReturnValue('/* output code */');

		// When

		const result = javaSourceCodeGenerator.generateSourceCode(entityRelationshipModel);

		// Then

		expect(result).toBe('/* output code */');

		checkCommonMocksCalls(commonTestData);

		checkAllMockCalls(javaClassModelCodeGeneratorMock.generateCode, [
			[javaClassModel]
		]);

	});

	test('Generate files', () => {

		// Given

		const commonTestData = getCommonTestData();

		const {
			entityRelationshipModel,
			javaClassModel
		} = commonTestData;

		const sourceFilesInfo: SourceFileInfo[] = [{
			filename: '',
			contents: '',
			folder: []
		}];

		// Setup mocks

		setupCommonMocks(commonTestData);

		javaClassModelSourceFilesGeneratorMock.generateSourceFiles.mockReturnValue(sourceFilesInfo);

		// When

		const result = javaSourceCodeGenerator.generateSourceFiles(entityRelationshipModel);

		// Then

		expect(result).toBe(sourceFilesInfo);

		checkCommonMocksCalls(commonTestData);

		checkAllMockCalls(javaClassModelSourceFilesGeneratorMock.generateSourceFiles, [
			[javaClassModel]
		]);

	});

	type CommonTestData = ReturnType<typeof getCommonTestData>

	function getCommonTestData() {

		const entityRelationshipModel: EntityRelationshipModel = {entities: [], relationships: []};

		const fieldDescriptor = createPrimitiveClassField('id', EntityPropertyType.IDENTITY);
		const classDescriptor = createClass('MyClass', {fields: [fieldDescriptor]});
		const classModel: ClassModel = {classes: [classDescriptor]};

		const javaField = createJavaField('id', 'java.lang.Long');
		const javaClass = createJavaClass('MyClass', {fields: [javaField]});
		const javaClassModel: JavaClassModel = {classes: [javaClass]};

		const setupData = 'setup_data';
		return {
			entityRelationshipModel,
			fieldDescriptor,
			classDescriptor,
			classModel,
			javaField,
			javaClass,
			javaClassModel,
			setupData
		};

	}

	function setupCommonMocks({
								  classModel,
								  classDescriptor,
								  fieldDescriptor,
								  javaClassModel,
								  setupData
							  }: CommonTestData) {

		classModelGeneratorMock.generateClassModel.mockReturnValue(classModel);

		javaClassModelDescriptorsRepository.getClassDescriptor.mockReturnValue(classDescriptor);
		javaClassModelDescriptorsRepository.getFieldDescriptor.mockReturnValue(fieldDescriptor);

		javaClassModelGeneratorMock.generateJavaClassModel.mockReturnValue({
			javaClassModel,
			javaClassModelDescriptorsRepository
		});

		javaClassModelTransformerMock.setup.mockReturnValue(setupData);

	}

	function checkCommonMocksCalls({
									   entityRelationshipModel,
									   classModel,
									   javaClassModel,
									   setupData,
									   javaClass,
									   classDescriptor,
									   javaField,
									   fieldDescriptor
								   }: CommonTestData) {

		checkAllMockCalls(classModelGeneratorMock.generateClassModel, [
			[entityRelationshipModel]
		]);

		checkAllMockCalls(javaClassModelGeneratorMock.generateJavaClassModel, [
			[classModel]
		]);

		checkAllMockCalls(javaClassModelTransformerMock.setup, [
			[{javaClassModel, classModel, entityRelationshipModel}]
		]);

		checkAllMockCalls(javaClassModelTransformerMock.visitModel, [
			[javaClassModel, {javaClassModel, classModel, entityRelationshipModel, setupData}]
		]);

		checkAllMockCalls(javaClassModelTransformerMock.visitClass, [
			[javaClass, {javaClassModel, classModel, entityRelationshipModel, setupData, classDescriptor}]
		]);

		checkAllMockCalls(javaClassModelTransformerMock.visitField, [
			[javaField, {
				javaClassModel,
				classModel,
				entityRelationshipModel,
				setupData,
				classDescriptor,
				javaClass,
				fieldDescriptor
			}]
		]);

	}

});
