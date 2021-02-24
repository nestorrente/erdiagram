import ClassModelToCodeConverterConfig from '../../ClassModelToCodeConverterConfig';
import JavaType from '../type/JavaType';
export default interface JavaClassModelToCodeConverterConfig extends ClassModelToCodeConverterConfig<JavaType> {
    generatedClassesPackage?: string;
    useSpringNullabilityAnnotations: boolean;
}
//# sourceMappingURL=JavaClassModelToCodeConverterConfig.d.ts.map