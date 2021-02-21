import ClassModelToCodeConverterSerializableConfig
	from '@/erdiagram/generator/oop/code-converter/ClassModelToCodeConverterSerializableConfig';

export default interface JavaClassModelToCodeConverterSerializableConfig extends ClassModelToCodeConverterSerializableConfig {
	generatedClassesPackage?: string;
	useSpringNullabilityAnnotations: boolean;
}
