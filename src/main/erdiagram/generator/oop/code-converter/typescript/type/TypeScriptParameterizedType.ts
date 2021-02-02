import TypeScriptType from '@/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType';

export default interface TypeScriptParameterizedType extends TypeScriptType {
	parameterTypes: TypeScriptType[];
}

export function createTypeScriptParameterizedType(name: string, parameterTypes: TypeScriptType[]): TypeScriptParameterizedType {
	return {
		name,
		parameterTypes,
		format: () => {
			const formattedParameterTypes = parameterTypes.map(t => t.format()).join(', ');
			return `${name}<${formattedParameterTypes}>`;
		}
	};
}

export function createTypeScriptArrayType(parameterType: TypeScriptType): TypeScriptParameterizedType {
	return {
		name: 'Array',
		parameterTypes: [parameterType],
		format: () => `${parameterType.format()}[]`
	};
}

export function isParameterizedType(javaType: TypeScriptType): javaType is TypeScriptParameterizedType {
	return Array.isArray((javaType as TypeScriptParameterizedType).parameterTypes);
}
