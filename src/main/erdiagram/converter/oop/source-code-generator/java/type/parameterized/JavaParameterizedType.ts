import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';

export default interface JavaParameterizedType extends JavaType {
	readonly parameterTypes: ReadonlyArray<JavaType>;
}
