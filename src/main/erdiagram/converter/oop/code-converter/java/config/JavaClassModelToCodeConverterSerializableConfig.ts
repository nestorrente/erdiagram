import ClassModelToCodeConverterSerializableConfig
	from '@/erdiagram/converter/oop/code-converter/ClassModelToCodeConverterSerializableConfig';
import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/annotation/validation/NotNullTextValidationStrategy';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/annotation/validation/NotNullBlobValidationStrategy';

export default interface JavaClassModelToCodeConverterSerializableConfig extends ClassModelToCodeConverterSerializableConfig {
	generatedClassesPackage?: string;
	useValidationAnnotations: boolean;
	notNullTextValidationStrategy: NotNullTextValidationStrategy;
	notNullBlobValidationStrategy: NotNullBlobValidationStrategy;
}
