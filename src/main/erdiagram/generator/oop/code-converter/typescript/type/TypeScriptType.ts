export default interface TypeScriptType {

	name: string;

	format(): string;

}

export function createTypeScriptType(name: string): TypeScriptType {
	return {
		name,
		format: () => name
	};
}
