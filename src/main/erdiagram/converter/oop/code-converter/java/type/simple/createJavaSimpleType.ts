import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';

export default function createJavaSimpleType(name: string, packageName?: string): JavaType {

	const canonicalName = packageName ? `${packageName}.${name}` : name;

	return {
		packageName,
		name,
		canonicalName,
		formatSimple() {
			return name;
		},
		formatCanonical() {
			return canonicalName;
		}
	};

}
