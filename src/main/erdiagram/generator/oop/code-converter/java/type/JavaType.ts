export default interface JavaType {

	packageName?: string;
	name: string;
	readonly canonicalName: string;

	format(): string;

}

export function createJavaType(name: string, packageName?: string): JavaType {
	return {
		packageName,
		name,
		get canonicalName() {
			if (packageName) {
				return `${packageName}.${name}`;
			} else {
				return name;
			}
		},
		format: () => name
	};
}
