export default interface JavaType {

	packageName?: string;
	name: string;
	canonicalName: string;

	formatSimple(): string;

	formatCanonical(): string;

}

export function createJavaType(name: string, packageName?: string): JavaType {

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
