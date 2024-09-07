import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy';
import JavaExtendedPackage
	from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage';

export default interface BeanValidationConfig {
	notNullTextValidationStrategy: NotNullTextValidationStrategy;
	notNullBlobValidationStrategy: NotNullBlobValidationStrategy;
	javaExtendedPackage: JavaExtendedPackage;
	annotateGetters: boolean;
}

export type PartialBeanValidationConfig = Partial<BeanValidationConfig>;
