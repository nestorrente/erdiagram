import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';
import JavaParameterizedType
	from '@/erdiagram/converter/oop/source-code-generator/java/type/parameterized/JavaParameterizedType';

export default function createJavaParameterizedType(name: string, packageName: string | undefined, parameterTypes: JavaType[]): JavaParameterizedType {
	return new JavaParameterizedTypeImpl(name, packageName, parameterTypes);
}

class JavaParameterizedTypeImpl implements JavaParameterizedType {

	private readonly _name: string;
	private readonly _packageName?: string;
	private readonly _canonicalName: string;
	private readonly _parameterTypes: JavaType[];

	constructor(name: string, packageName: string | undefined, parameterTypes: JavaType[]) {
		this._name = name;
		this._packageName = packageName;
		this._canonicalName = packageName ? `${packageName}.${name}` : name;
		this._parameterTypes = parameterTypes;
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

	get parameterTypes() {
		return this._parameterTypes;
	}

	formatSimple() {
		const formattedParameterTypes = this._parameterTypes.map(parameterType => parameterType.formatSimple()).join(', ');
		return `${this._name}<${formattedParameterTypes}>`;
	}

	formatCanonical() {
		const formattedParameterTypes = this._parameterTypes.map(parameterType => parameterType.formatCanonical()).join(', ');
		return `${this._canonicalName}<${formattedParameterTypes}>`;
	}

}
