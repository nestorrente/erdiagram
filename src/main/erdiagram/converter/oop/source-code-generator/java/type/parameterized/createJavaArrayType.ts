import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';
import JavaParameterizedType
	from '@/erdiagram/converter/oop/source-code-generator/java/type/parameterized/JavaParameterizedType';

export default function createJavaArrayType(parameterType: JavaType): JavaParameterizedType {
	return new JavaArrayTypeImpl(parameterType);
}

class JavaArrayTypeImpl implements JavaParameterizedType {

	private readonly _name: string;
	private readonly _canonicalName: string;
	private readonly _parameterType: JavaType;

	constructor(parameterType: JavaType) {
		this._name = `${parameterType.name}[]`;
		this._canonicalName = `${parameterType.canonicalName}[]`;
		this._parameterType = parameterType;
	}

	get canonicalName() {
		return this._canonicalName;
	}

	get name() {
		return this._name;
	}

	get packageName() {
		return undefined;
	}

	get parameterTypes() {
		return [this._parameterType];
	}

	formatSimple() {
		const formattedParameterType = this._parameterType.formatSimple();
		return `${formattedParameterType}[]`;
	}

	formatCanonical() {
		const formattedParameterType = this._parameterType.formatCanonical();
		return `${formattedParameterType}[]`;
	}

}
