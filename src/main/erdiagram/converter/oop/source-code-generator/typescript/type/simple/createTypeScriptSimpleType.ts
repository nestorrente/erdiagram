import TypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptType';

export default function createTypeScriptSimpleType(name: string): TypeScriptType {
	return new TypeScriptSimpleTypeImpl(name);
}

class TypeScriptSimpleTypeImpl implements TypeScriptType {

	private readonly _name: string;

	constructor(name: string) {
		this._name = name;
	}

	get name() {
		return this._name;
	}

	format(): string {
		return this._name;
	}

}
