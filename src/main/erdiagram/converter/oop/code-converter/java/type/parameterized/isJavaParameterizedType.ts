import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import JavaParameterizedType
	from '@/erdiagram/converter/oop/code-converter/java/type/parameterized/JavaParameterizedType';

export default function isJavaParameterizedType(javaType: JavaType): javaType is JavaParameterizedType {
	return Array.isArray((javaType as JavaParameterizedType).parameterTypes);
}
