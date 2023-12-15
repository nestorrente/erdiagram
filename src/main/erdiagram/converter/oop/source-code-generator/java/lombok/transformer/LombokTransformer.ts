import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/JavaClassModelTransformer';
import {
	JavaClassModelTransformContext,
	JavaClassTransformContext,
	JavaFieldTransformContext,
	SetupContext
} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import { PartialLombokConfig } from '@/erdiagram/converter/oop/source-code-generator/java/lombok/config/LombokConfig';
import lombokConfigManager
	from '@/erdiagram/converter/oop/source-code-generator/java/lombok/config/LombokConfigManager';
import {
	JavaClass,
	JavaClassModel,
	JavaField
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import LombokTransformerClassVisitor
	from '@/erdiagram/converter/oop/source-code-generator/java/lombok/transformer/visitor/class/LombokTransformerClassVisitor';

export class LombokTransformer implements JavaClassModelTransformer {

	private readonly _classVisitor: LombokTransformerClassVisitor;

	constructor(config?: PartialLombokConfig) {
		const fullConfig = lombokConfigManager.mergeWithDefaultConfig(config);
		this._classVisitor = new LombokTransformerClassVisitor(fullConfig);
	}

	setup(context: SetupContext): unknown {
		return undefined;
	}

	visitField(javaField: JavaField, context: JavaFieldTransformContext<unknown>): void {
		// Do nothing
	}

	visitClass(javaClass: JavaClass, context: JavaClassTransformContext<unknown>): void {
		this._classVisitor.visitClass(javaClass);
	}

	visitModel(javaClassModel: JavaClassModel, context: JavaClassModelTransformContext<unknown>): void {
		// Do nothing
	}

}
