import JavaType from '@/erdiagram/generator/oop/code-converter/java/type/JavaType';

export default interface JavaParameterizedType extends JavaType {
	parameterTypes: JavaType[];
}

export function createJavaParameterizedType(name: string, packageName: string, parameterTypes: JavaType[]): JavaParameterizedType {
	return {
		packageName,
		name,
		parameterTypes,
		get canonicalName() {
			return `${packageName}.${name}`;
		},
		format: () => {
			const formattedParameterTypes = parameterTypes.map(t => t.format()).join(', ');
			return `${name}<${formattedParameterTypes}>`;
		}
	};
}

export function isJavaParameterizedType(javaType: JavaType): javaType is JavaParameterizedType {
	return Array.isArray((javaType as JavaParameterizedType).parameterTypes);
}
