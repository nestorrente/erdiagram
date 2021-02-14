import ClassModelToCodeConverterSerializedConfig
	from '@/erdiagram/generator/oop/code-converter/ClassModelToCodeConverterSerializedConfig';

export default interface JavaClassModelToCodeConverterSerializedConfig extends ClassModelToCodeConverterSerializedConfig {
	generatedClassesPackage?: string;
	useSpringNullabilityAnnotations: boolean;
}
