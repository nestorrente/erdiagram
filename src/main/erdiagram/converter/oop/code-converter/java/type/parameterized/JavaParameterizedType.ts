import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';

export default interface JavaParameterizedType extends JavaType {
	readonly parameterTypes: ReadonlyArray<JavaType>;
}
