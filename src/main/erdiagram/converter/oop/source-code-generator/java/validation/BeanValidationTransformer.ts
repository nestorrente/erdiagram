import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/JavaClassModelTransformer';
import { JavaFieldTransformContext } from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import { JavaField } from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import BeanValidationAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/visitor/BeanValidationAnnotationsSupplier';
import {PartialBeanValidationConfig} from '@/erdiagram/converter/oop/source-code-generator/java/validation/config/BeanValidationConfig';
import beanValidationConfigManager
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/config/BeanValidationConfigManager';
import BeanValidationFieldVisitor
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/visitor/BeanValidationFieldVisitor';
import JavaValidationAnnotationTypesProvider
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/JavaValidationAnnotationTypesProvider';

export default class BeanValidationTransformer implements JavaClassModelTransformer {

	private readonly _beanValidationFieldVisitor: BeanValidationFieldVisitor;

	constructor(config?: PartialBeanValidationConfig) {

		const {
			notNullTextValidationStrategy,
			notNullBlobValidationStrategy,
			javaExtendedPackage,
			annotateGetters
		} = beanValidationConfigManager.mergeWithDefaultConfig(config);

		const beanValidationAnnotationsSupplier = new BeanValidationAnnotationsSupplier(
				notNullTextValidationStrategy,
				notNullBlobValidationStrategy,
				new JavaValidationAnnotationTypesProvider(javaExtendedPackage)
		);

		this._beanValidationFieldVisitor = new BeanValidationFieldVisitor(
				beanValidationAnnotationsSupplier,
				annotateGetters
		);

	}

	setup(): unknown {
		return undefined;
	}

	visitField(javaField: JavaField, context: JavaFieldTransformContext<unknown>): void {
		this._beanValidationFieldVisitor.visitField(javaField, context);
	}

	visitClass(): void {
		// Do nothing
	}

	visitModel(): void {
		// Do nothing
	}

}
