import JavaType from '@/erdiagram/generator/oop/code-converter/java/type/JavaType';

export default interface JavaParameterizedType extends JavaType {
	parameterTypes: JavaType[];
}

export function createJavaParameterizedType(name: string, packageName: string | undefined, parameterTypes: JavaType[]): JavaParameterizedType {

	const canonicalName = packageName ? `${packageName}.${name}` : name;

	return {
		packageName,
		name,
		parameterTypes,
		canonicalName,
		formatSimple(canonical: boolean = false) {
			const formattedParameterTypes = parameterTypes.map(t => t.formatSimple()).join(', ');
			return `${name}<${formattedParameterTypes}>`;
		},
		formatCanonical(canonical: boolean = false) {
			const formattedParameterTypes = parameterTypes.map(t => t.formatCanonical()).join(', ');
			return `${canonicalName}<${formattedParameterTypes}>`;
		}
	};
}

export function createJavaArrayType(parameterType: JavaType): JavaParameterizedType {

	const name = `${parameterType.name}[]`;

	return {
		name,
		parameterTypes: [parameterType],
		canonicalName: name,
		formatSimple() {
			return `${parameterType.formatSimple()}[]`;
		},
		formatCanonical() {
			return `${parameterType.formatCanonical()}[]`;
		}
	};

}

export function isJavaParameterizedType(javaType: JavaType): javaType is JavaParameterizedType {
	return Array.isArray((javaType as JavaParameterizedType).parameterTypes);
}
