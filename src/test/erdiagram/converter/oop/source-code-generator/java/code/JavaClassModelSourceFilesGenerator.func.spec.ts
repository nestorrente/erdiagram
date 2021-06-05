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

	const packageName = 'com.example.erdiagram';

	const myClass1 = createJavaClass('MyClass1', {packageName});
	const myClass2 = createJavaClass('MyClass2', {packageName});

	const result = javaClassModelSourceFilesGenerator.generateSourceFiles({
		classes: [
			myClass1,
			myClass2
		]
	});

	expect(result).toStrictEqual<SourceFileInfo[]>([
		{
			folder: ['com', 'example', 'erdiagram'],
			filename: 'MyClass1.java',
			contents: '/* code for class MyClass1 */'
		},
		{
			folder: ['com', 'example', 'erdiagram'],
			filename: 'MyClass2.java',
			contents: '/* code for class MyClass2 */'
		}
	]);

	expect(javaClassCodeGeneratorMock.generateCode).toHaveBeenCalledTimes(2);
	expect(javaClassCodeGeneratorMock.generateCode).toHaveBeenNthCalledWith(1, myClass1);
	expect(javaClassCodeGeneratorMock.generateCode).toHaveBeenNthCalledWith(2, myClass2);

});
