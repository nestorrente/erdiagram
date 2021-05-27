import {
	JavaClassModel,
	JavaVisibility
} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import JavaClassModelCodeGenerator
	from '@/erdiagram/converter/oop/code-converter/java/code/JavaClassModelCodeGenerator';

const javaClassModelToCodeConverter = new JavaClassModelCodeGenerator();

test('Single minimum class', () => {

	const javaClassModel: JavaClassModel = {
		classes: [
			{
				annotations: [],
				packageName: undefined,
				visibility: JavaVisibility.PUBLIC,
				name: 'MyClass',
				fields: []
			}
		]
	};

	const result = javaClassModelToCodeConverter.generateCode(javaClassModel);

	expect(result).toBe(`
/* ========== MyClass class ========== */

public class MyClass {

}
`.trim());

});
