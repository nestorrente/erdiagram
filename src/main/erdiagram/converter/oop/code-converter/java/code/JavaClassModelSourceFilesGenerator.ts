import {JavaClass, JavaClassModel} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import JavaClassCodeGenerator from '@/erdiagram/converter/oop/code-converter/java/code/JavaClassCodeGenerator';
import SourceFileInfo from '@/erdiagram/converter/common/SourceFileInfo';

export default class JavaClassModelSourceFilesGenerator {

	readonly #javaClassCodeGenerator: JavaClassCodeGenerator;

	constructor(javaClassCodeGenerator: JavaClassCodeGenerator) {
		this.#javaClassCodeGenerator = javaClassCodeGenerator;
	}

	public generateSourceFiles(javaClassModel: JavaClassModel): SourceFileInfo[] {
		return javaClassModel.classes.map(javaClass => this.generateClassSourceFile(javaClass));
	}

	private generateClassSourceFile(javaClass: JavaClass): SourceFileInfo {
		return {
			folder: this.generateClassSourceFileFolder(javaClass),
			filename: this.generateClassSourceFileName(javaClass),
			contents: this.#javaClassCodeGenerator.generateCode(javaClass)
		};
	}

	private generateClassSourceFileFolder(javaClass: JavaClass) {
		return javaClass.packageName?.split('.') ?? [];
	}

	private generateClassSourceFileName(javaClass: JavaClass) {
		return `${javaClass.name}.java`;
	}

}
