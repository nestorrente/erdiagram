import JavaType from './JavaType';
export default interface JavaParameterizedType extends JavaType {
    parameterTypes: JavaType[];
}
export declare function createJavaParameterizedType(name: string, packageName: string | undefined, parameterTypes: JavaType[]): JavaParameterizedType;
export declare function createJavaArrayType(parameterType: JavaType): JavaParameterizedType;
export declare function isJavaParameterizedType(javaType: JavaType): javaType is JavaParameterizedType;
//# sourceMappingURL=JavaParameterizedType.d.ts.map