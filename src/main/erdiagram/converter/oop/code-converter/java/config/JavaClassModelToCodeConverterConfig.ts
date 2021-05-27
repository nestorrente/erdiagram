import ClassModelToCodeConverterConfig from '@/erdiagram/converter/oop/code-converter/ClassModelToCodeConverterConfig';
import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/validation/strategy/NotNullTextValidationStrategy';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/validation/strategy/NotNullBlobValidationStrategy';
import {WithPartial} from '@/erdiagram/util/types';

export default interface JavaClassModelToCodeConverterConfig extends ClassModelToCodeConverterConfig<JavaType> {
	generatedClassesPackage?: string;
	useValidationAnnotations: boolean;
	notNullTextValidationStrategy: NotNullTextValidationStrategy;
	notNullBlobValidationStrategy: NotNullBlobValidationStrategy;
}

export type PartialJavaClassModelToCodeConverterConfig = Partial<WithPartial<JavaClassModelToCodeConverterConfig, 'typeBindings'>>;
