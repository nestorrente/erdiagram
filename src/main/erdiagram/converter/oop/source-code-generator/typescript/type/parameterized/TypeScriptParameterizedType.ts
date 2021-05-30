import TypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptType';

export default interface TypeScriptParameterizedType extends TypeScriptType {
	parameterTypes: TypeScriptType[];
}
