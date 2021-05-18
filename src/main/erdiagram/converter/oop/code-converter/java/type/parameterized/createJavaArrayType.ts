import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import JavaParameterizedType
	from '@/erdiagram/converter/oop/code-converter/java/type/parameterized/JavaParameterizedType';

export default function createJavaArrayType(parameterType: JavaType): JavaParameterizedType {

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
