export default interface JavaType {

	packageName?: string;
	name: string;
	canonicalName: string;

	formatSimple(): string;

	formatCanonical(): string;

}
