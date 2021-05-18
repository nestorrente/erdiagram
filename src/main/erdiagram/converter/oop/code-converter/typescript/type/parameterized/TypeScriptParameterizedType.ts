import TypeScriptType from '@/erdiagram/converter/oop/code-converter/typescript/type/TypeScriptType';

export default interface TypeScriptParameterizedType extends TypeScriptType {
	parameterTypes: TypeScriptType[];
}
