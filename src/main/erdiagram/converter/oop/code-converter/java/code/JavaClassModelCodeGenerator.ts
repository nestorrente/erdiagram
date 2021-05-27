import {JavaClass, JavaClassModel} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import JavaClassCodeGenerator from '@/erdiagram/converter/oop/code-converter/java/code/JavaClassCodeGenerator';

const EMPTY_STRING: string = '';

export default class JavaClassModelCodeGenerator {

	readonly #javaClassCodeGenerator: JavaClassCodeGenerator;

	constructor() {
		this.#javaClassCodeGenerator = new JavaClassCodeGenerator();
	}

	public generateCode(javaClassModel: JavaClassModel): string {
		return javaClassModel.classes
				.map(javaClass => this.generateClassCode(javaClass))
				.join('\n\n');
	}

	private generateClassCode(javaClass: JavaClass) {
		const headerComment = this.generateClassHeaderComment(javaClass);
		const classCode = this.#javaClassCodeGenerator.generateCode(javaClass);
		return `${headerComment}\n\n${classCode}`;
	}

	private generateClassHeaderComment(javaClass: JavaClass) {
		return `/* ========== ${javaClass.name} class ========== */`;
	}

}
