import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/validation/strategy/NotNullTextValidationStrategy';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/validation/strategy/NotNullBlobValidationStrategy';

export default interface JavaxValidationTransformerConfig {
	notNullTextValidationStrategy: NotNullTextValidationStrategy;
	notNullBlobValidationStrategy: NotNullBlobValidationStrategy;
	annotateGetters: boolean;
}

export type PartialJavaxValidationTransformerConfig = Partial<JavaxValidationTransformerConfig>;
