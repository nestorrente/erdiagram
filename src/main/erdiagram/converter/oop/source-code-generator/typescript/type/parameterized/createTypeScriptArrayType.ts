import TypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptType';
import TypeScriptParameterizedType
	from '@/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/TypeScriptParameterizedType';

export default function createTypeScriptArrayType(parameterType: TypeScriptType): TypeScriptParameterizedType {
	return new TypeScriptArrayTypeImpl(parameterType);
}

class TypeScriptArrayTypeImpl implements TypeScriptParameterizedType {

	private readonly _parameterType: TypeScriptType;

	constructor(parameterType: TypeScriptType) {
		this._parameterType = parameterType;
	}

	get name() {
		return 'Array';
	}

	get parameterTypes() {
		return [this._parameterType];
	}

	format(): string {
		const formattedParameterType = this._parameterType.format();
		return `${formattedParameterType}[]`;
	}

}
