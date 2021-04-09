import ClassModelToCodeConverterSerializableConfig
	from '@/erdiagram/converter/oop/code-converter/ClassModelToCodeConverterSerializableConfig';

export default interface JavaClassModelToCodeConverterSerializableConfig extends ClassModelToCodeConverterSerializableConfig {
	generatedClassesPackage?: string;
	useSpringNullabilityAnnotations: boolean;
}
