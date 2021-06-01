import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';

export default function createJavaSimpleType(name: string, packageName?: string): JavaType {
	return new JavaSimpleTypeImpl(name, packageName);
}

class JavaSimpleTypeImpl implements JavaType {

	private readonly _name: string;
	private readonly _packageName?: string;
	private readonly _canonicalName: string;

	constructor(name: string, packageName?: string) {
		this._name = name;
		this._packageName = packageName;
		this._canonicalName = packageName ? `${packageName}.${name}` : name;
	}

	get canonicalName() {
		return this._canonicalName;
	}

	get name() {
		return this._name;
	}

	get packageName() {
		return this._packageName;
	}

	formatSimple() {
		return this._name;
	}

	formatCanonical() {
		return this._canonicalName;
	}

}
