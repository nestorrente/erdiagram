import ClassModelToCodeConverterConfig from '@/erdiagram/generator/oop/code-converter/ClassModelToCodeConverterConfig';
import JavaType from '@/erdiagram/generator/oop/code-converter/java/type/JavaType';

export default interface JavaClassModelToCodeConverterConfig extends ClassModelToCodeConverterConfig<JavaType> {
	generatedClassesPackage?: string;
	useSpringNullabilityAnnotations: boolean;
}
