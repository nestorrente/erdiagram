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
import BeanValidationAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/visitor/BeanValidationAnnotationsSupplier';
import {PartialBeanValidationTransformerConfig} from '@/erdiagram/converter/oop/source-code-generator/java/validation/config/BeanValidationTransformerConfig';
import beanValidationTransformerConfigManager
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/config/BeanValidationTransformerConfigManager';
import BeanValidationFieldVisitor
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/visitor/BeanValidationFieldVisitor';

export default class BeanValidationTransformer implements JavaClassModelTransformer {

	private readonly _beanValidationFieldVisitor: BeanValidationFieldVisitor;

	constructor(config?: PartialBeanValidationTransformerConfig) {

		const {
			notNullTextValidationStrategy,
			notNullBlobValidationStrategy,
			annotateGetters
		} = beanValidationTransformerConfigManager.mergeWithDefaultConfig(config);

		const beanValidationAnnotationsSupplier = new BeanValidationAnnotationsSupplier(notNullTextValidationStrategy, notNullBlobValidationStrategy);

		this._beanValidationFieldVisitor = new BeanValidationFieldVisitor(
				beanValidationAnnotationsSupplier,
				annotateGetters
		);

	}

	setup(context: SetupContext): unknown {
		return undefined;
	}

	visitField(javaField: JavaField, context: JavaFieldTransformContext<unknown>): void {
		this._beanValidationFieldVisitor.visitField(javaField, context);
	}

	visitClass(javaClass: JavaClass, context: JavaClassTransformContext<unknown>): void {
		// Do nothing
	}

	visitModel(javaClassModel: JavaClassModel, context: JavaClassModelTransformContext<unknown>): void {
		// Do nothing
	}

}
