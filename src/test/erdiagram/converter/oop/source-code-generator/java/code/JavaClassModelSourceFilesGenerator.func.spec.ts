import {JavaClass} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import JavaClassModelSourceFilesGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelSourceFilesGenerator';
import SourceFileInfo from '@/erdiagram/converter/common/SourceFileInfo';
import {createJavaClass} from '#/erdiagram/converter/oop/source-code-generator/java/model/generator/source/java-class-model-mothers';
import {createMockObject} from '#/erdiagram/util/jest-utils';
import JavaClassCodeGenerator from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaClassCodeGenerator';

const javaClassCodeGeneratorMock = createMockObject<JavaClassCodeGenerator>({
	generateCode: jest.fn((javaClass: JavaClass): string => {
		return `/* code for class ${javaClass.name} */`;
	})
});

const javaClassModelSourceFilesGenerator = new JavaClassModelSourceFilesGenerator(javaClassCodeGeneratorMock);

test('Should invoke JavaClassCodeGenerator for all classes', () => {

	const classWithoutPackage = createJavaClass('ClassWithoutPackage');
	const classWithPackage = createJavaClass('ClassWithPackage', {
		packageName: 'com.example.erdiagram'
	});

	const result = javaClassModelSourceFilesGenerator.generateSourceFiles({
		classes: [
			classWithoutPackage,
			classWithPackage
		]
	});

	expect(result).toStrictEqual<SourceFileInfo[]>([
		{
			folder: [],
			filename: 'ClassWithoutPackage.java',
			contents: '/* code for class ClassWithoutPackage */'
		},
		{
			folder: ['com', 'example', 'erdiagram'],
			filename: 'ClassWithPackage.java',
			contents: '/* code for class ClassWithPackage */'
		}
	]);

	expect(javaClassCodeGeneratorMock.generateCode).toHaveBeenCalledTimes(2);
	expect(javaClassCodeGeneratorMock.generateCode).toHaveBeenNthCalledWith(1, classWithoutPackage);
	expect(javaClassCodeGeneratorMock.generateCode).toHaveBeenNthCalledWith(2, classWithPackage);

});
