import TypeScriptType from '@/erdiagram/converter/oop/code-converter/typescript/type/TypeScriptType';
import TypeScriptParameterizedType
	from '@/erdiagram/converter/oop/code-converter/typescript/type/parameterized/TypeScriptParameterizedType';

export default function isTypeScriptParameterizedType(javaType: TypeScriptType): javaType is TypeScriptParameterizedType {
	return Array.isArray((javaType as TypeScriptParameterizedType).parameterTypes);
}
