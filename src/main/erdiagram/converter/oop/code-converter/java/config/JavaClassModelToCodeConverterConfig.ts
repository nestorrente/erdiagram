import ClassModelToCodeConverterConfig from '@/erdiagram/converter/oop/code-converter/ClassModelToCodeConverterConfig';
import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';

export default interface JavaClassModelToCodeConverterConfig extends ClassModelToCodeConverterConfig<JavaType> {
	generatedClassesPackage?: string;
	useSpringNullabilityAnnotations: boolean;
}
