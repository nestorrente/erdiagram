export default interface JavaType {

	readonly packageName?: string;
	readonly name: string;
	readonly canonicalName: string;

	formatSimple(): string;

	formatCanonical(): string;

}
