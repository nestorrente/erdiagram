import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/JavaClassModelTransformer';
import { PartialLombokConfig } from '@/erdiagram/converter/oop/source-code-generator/java/lombok/config/LombokConfig';
import lombokConfigManager
	from '@/erdiagram/converter/oop/source-code-generator/java/lombok/config/LombokConfigManager';
import { JavaClass } from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import LombokTransformerClassVisitor
	from '@/erdiagram/converter/oop/source-code-generator/java/lombok/transformer/visitor/class/LombokTransformerClassVisitor';

export class LombokTransformer implements JavaClassModelTransformer {

	private readonly _classVisitor: LombokTransformerClassVisitor;

	constructor(config?: PartialLombokConfig) {
		const fullConfig = lombokConfigManager.mergeWithDefaultConfig(config);
		this._classVisitor = new LombokTransformerClassVisitor(fullConfig);
	}

	setup(): unknown {
		return undefined;
	}

	visitField(): void {
		// Do nothing
	}

	visitClass(javaClass: JavaClass): void {
		this._classVisitor.visitClass(javaClass);
	}

	visitModel(): void {
		// Do nothing
	}

}
