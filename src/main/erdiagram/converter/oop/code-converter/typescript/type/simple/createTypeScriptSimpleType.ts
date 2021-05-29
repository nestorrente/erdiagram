import TypeScriptType from '@/erdiagram/converter/oop/code-converter/typescript/type/TypeScriptType';

export default function createTypeScriptSimpleType(name: string): TypeScriptType {
	return new TypeScriptSimpleTypeImpl(name);
}

class TypeScriptSimpleTypeImpl implements TypeScriptType {

	readonly #name: string;

	constructor(name: string) {
		this.#name = name;
	}

	get name() {
		return this.#name;
	}

	format(): string {
		return this.#name;
	}

}
