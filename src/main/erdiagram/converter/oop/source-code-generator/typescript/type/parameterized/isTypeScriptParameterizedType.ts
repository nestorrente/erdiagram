import TypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptType';
import TypeScriptParameterizedType
	from '@/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/TypeScriptParameterizedType';

export default function isTypeScriptParameterizedType(javaType: TypeScriptType): javaType is TypeScriptParameterizedType {
	return Array.isArray((javaType as TypeScriptParameterizedType).parameterTypes);
}
