import TypeScriptType from '@/erdiagram/converter/oop/code-converter/typescript/type/TypeScriptType';
import TypeScriptParameterizedType
	from '@/erdiagram/converter/oop/code-converter/typescript/type/parameterized/TypeScriptParameterizedType';

export default function createTypeScriptParameterizedType(name: string, parameterTypes: TypeScriptType[]): TypeScriptParameterizedType {
	return {
		name,
		parameterTypes,
		format: () => {
			const formattedParameterTypes = parameterTypes.map(t => t.format()).join(', ');
			return `${name}<${formattedParameterTypes}>`;
		}
	};
}
