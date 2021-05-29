import {JavaClass} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import JavaClassModelCodeGenerator
	from '@/erdiagram/converter/oop/code-converter/java/code/JavaClassModelCodeGenerator';
import JavaClassCodeGenerator from '@/erdiagram/converter/oop/code-converter/java/code/JavaClassCodeGenerator';
import {createJavaClass} from '#/erdiagram/converter/oop/code-converter/java/model/generator/source/java-class-model-mothers';

const javaClassCodeGeneratorMock = {
	generateCode: jest.fn((javaClass: JavaClass): string => {
		return `/* code for class ${javaClass.name} */`;
	})
};

const javaClassModelCodeGenerator = new JavaClassModelCodeGenerator(
		javaClassCodeGeneratorMock as unknown as JavaClassCodeGenerator
);

test('Should invoke JavaClassCodeGenerator for all classes', () => {

	const myClass1 = createJavaClass('MyClass1');
	const myClass2 = createJavaClass('MyClass2');

	const result = javaClassModelCodeGenerator.generateCode({
		classes: [
			myClass1,
			myClass2
		]
	});

	expect(result).toBe(`
/* ========== MyClass1 class ========== */

/* code for class MyClass1 */

/* ========== MyClass2 class ========== */

/* code for class MyClass2 */
`.trim());

	expect(javaClassCodeGeneratorMock.generateCode).toHaveBeenCalledTimes(2);
	expect(javaClassCodeGeneratorMock.generateCode).toHaveBeenNthCalledWith(1, myClass1);
	expect(javaClassCodeGeneratorMock.generateCode).toHaveBeenNthCalledWith(2, myClass2);

});
