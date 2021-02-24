import TypeScriptType from './TypeScriptType';
export default interface TypeScriptParameterizedType extends TypeScriptType {
    parameterTypes: TypeScriptType[];
}
export declare function createTypeScriptParameterizedType(name: string, parameterTypes: TypeScriptType[]): TypeScriptParameterizedType;
export declare function createTypeScriptArrayType(parameterType: TypeScriptType): TypeScriptParameterizedType;
export declare function isTypeScriptParameterizedType(javaType: TypeScriptType): javaType is TypeScriptParameterizedType;
//# sourceMappingURL=TypeScriptParameterizedType.d.ts.map