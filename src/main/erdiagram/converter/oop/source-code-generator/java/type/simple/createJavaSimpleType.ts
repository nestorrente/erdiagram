import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';

export default function createJavaSimpleType(name: string, packageName?: string): JavaType {
	return new JavaSimpleTypeImpl(name, packageName);
}

class JavaSimpleTypeImpl implements JavaType {

	readonly #name: string;
	readonly #packageName?: string;
	readonly #canonicalName: string;

	constructor(name: string, packageName?: string) {
		this.#name = name;
		this.#packageName = packageName;
		this.#canonicalName = packageName ? `${packageName}.${name}` : name;
	}

	get canonicalName() {
		return this.#canonicalName;
	}

	get name() {
		return this.#name;
	}

	get packageName() {
		return this.#packageName;
	}

	formatSimple() {
		return this.#name;
	}

	formatCanonical() {
		return this.#canonicalName;
	}

}
