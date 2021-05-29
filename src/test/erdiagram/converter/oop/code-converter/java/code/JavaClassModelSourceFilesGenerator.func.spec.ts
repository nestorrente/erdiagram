import {JavaClass} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import JavaClassCodeGenerator from '@/erdiagram/converter/oop/code-converter/java/code/JavaClassCodeGenerator';
import JavaClassModelSourceFilesGenerator
	from '@/erdiagram/converter/oop/code-converter/java/code/JavaClassModelSourceFilesGenerator';
import SourceFileInfo from '@/erdiagram/converter/common/SourceFileInfo';
import {createJavaClass} from '../model/generator/source/java-class-model-mothers';

const javaClassCodeGeneratorMock = {
	generateCode: jest.fn((javaClass: JavaClass): string => {
		return `/* code for class ${javaClass.name} */`;
	})
};

const javaClassModelSourceFilesGenerator = new JavaClassModelSourceFilesGenerator(
		javaClassCodeGeneratorMock as unknown as JavaClassCodeGenerator
);

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
