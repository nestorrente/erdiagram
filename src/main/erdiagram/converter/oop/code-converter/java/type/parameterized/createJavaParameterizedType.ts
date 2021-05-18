import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import JavaParameterizedType
	from '@/erdiagram/converter/oop/code-converter/java/type/parameterized/JavaParameterizedType';

export default function createJavaParameterizedType(name: string, packageName: string | undefined, parameterTypes: JavaType[]): JavaParameterizedType {

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
