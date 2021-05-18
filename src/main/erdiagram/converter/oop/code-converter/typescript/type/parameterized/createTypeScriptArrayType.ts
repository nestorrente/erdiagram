import TypeScriptType from '@/erdiagram/converter/oop/code-converter/typescript/type/TypeScriptType';
import TypeScriptParameterizedType
	from '@/erdiagram/converter/oop/code-converter/typescript/type/parameterized/TypeScriptParameterizedType';

export default function createTypeScriptArrayType(parameterType: TypeScriptType): TypeScriptParameterizedType {
	return {
		name: 'Array',
		parameterTypes: [parameterType],
		format: () => `${parameterType.format()}[]`
	};
}
