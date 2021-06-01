import {
	JavaClass,
	JavaClassModel
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import JavaClassCodeGenerator from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaClassCodeGenerator';

export default class JavaClassModelCodeGenerator {

	private readonly _javaClassCodeGenerator: JavaClassCodeGenerator;

	constructor(javaClassCodeGenerator: JavaClassCodeGenerator) {
		this._javaClassCodeGenerator = javaClassCodeGenerator;
	}

	public generateCode(javaClassModel: JavaClassModel): string {
		return javaClassModel.classes
				.map(javaClass => this.generateClassCode(javaClass))
				.join('\n\n');
	}

	private generateClassCode(javaClass: JavaClass) {
		const headerComment = this.generateClassHeaderComment(javaClass);
		const classCode = this._javaClassCodeGenerator.generateCode(javaClass);
		return `${headerComment}\n\n${classCode}`;
	}

	private generateClassHeaderComment(javaClass: JavaClass) {
		return `/* ========== ${javaClass.name} class ========== */`;
	}

}
