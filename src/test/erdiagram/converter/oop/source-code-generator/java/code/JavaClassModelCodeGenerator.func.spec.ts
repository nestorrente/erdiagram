import {JavaClass} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import JavaClassModelCodeGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelCodeGenerator';
import JavaClassCodeGenerator from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaClassCodeGenerator';
import {createJavaClass} from '#/erdiagram/converter/oop/source-code-generator/java/model/generator/source/java-class-model-mothers';
import {createMockObject} from '#/erdiagram/util/jest-utils';

const javaClassCodeGeneratorMock = createMockObject<JavaClassCodeGenerator>({
	generateCode: jest.fn((javaClass: JavaClass): string => {
		return `/* code for class ${javaClass.name} */`;
	})
});

const javaClassModelCodeGenerator = new JavaClassModelCodeGenerator(javaClassCodeGeneratorMock);

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
