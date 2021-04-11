import ClassModelToCodeConverterConfig from '@/erdiagram/converter/oop/code-converter/ClassModelToCodeConverterConfig';
import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/annotation/validation/NotNullTextValidationStrategy';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/annotation/validation/NotNullBlobValidationStrategy';

export default interface JavaClassModelToCodeConverterConfig extends ClassModelToCodeConverterConfig<JavaType> {
	generatedClassesPackage?: string;
	useValidationAnnotations: boolean;
	notNullTextValidationStrategy: NotNullTextValidationStrategy;
	notNullBlobValidationStrategy: NotNullBlobValidationStrategy;
}
