import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/JavaClassModelTransformer';
import {
	JavaClassModelTransformContext,
	JavaClassTransformContext,
	JavaFieldTransformContext,
	SetupContext
} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import {
	JavaClass,
	JavaClassModel,
	JavaField
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import JavaxValidationAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/visitor/JavaxValidationAnnotationsSupplier';
import {PartialJavaxValidationTransformerConfig} from '@/erdiagram/converter/oop/source-code-generator/java/validation/config/JavaxValidationTransformerConfig';
import javaxValidationTransformerConfigManager
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/config/JavaxValidationTransformerConfigManager';
import JavaxValidationFieldVisitor
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/visitor/JavaxValidationFieldVisitor';

export default class JavaxValidationTransformer implements JavaClassModelTransformer {

	private readonly _javaxValidationFieldVisitor: JavaxValidationFieldVisitor;

	constructor(config?: PartialJavaxValidationTransformerConfig) {

		const {
			notNullTextValidationStrategy,
			notNullBlobValidationStrategy,
			annotateGetters
		} = javaxValidationTransformerConfigManager.mergeWithDefaultConfig(config);

		const javaxValidationAnnotationsSupplier = new JavaxValidationAnnotationsSupplier(notNullTextValidationStrategy, notNullBlobValidationStrategy);

		this._javaxValidationFieldVisitor = new JavaxValidationFieldVisitor(
				javaxValidationAnnotationsSupplier,
				annotateGetters
		);

	}

	setup(context: SetupContext): unknown {
		return undefined;
	}

	visitField(javaField: JavaField, context: JavaFieldTransformContext<unknown>): void {
		this._javaxValidationFieldVisitor.visitField(javaField, context);
	}

	visitClass(javaClass: JavaClass, context: JavaClassTransformContext<unknown>): void {
		// Do nothing
	}

	visitModel(javaClassModel: JavaClassModel, context: JavaClassModelTransformContext<unknown>): void {
		// Do nothing
	}

}
