import TypeScriptType from '@/erdiagram/converter/oop/code-converter/typescript/type/TypeScriptType';
import TypeScriptParameterizedType
	from '@/erdiagram/converter/oop/code-converter/typescript/type/parameterized/TypeScriptParameterizedType';

export default function createTypeScriptArrayType(parameterType: TypeScriptType): TypeScriptParameterizedType {
	return new TypeScriptArrayTypeImpl(parameterType);
}

class TypeScriptArrayTypeImpl implements TypeScriptParameterizedType {

	readonly #parameterType: TypeScriptType;

	constructor(parameterType: TypeScriptType) {
		this.#parameterType = parameterType;
	}

	get name() {
		return 'Array';
	}

	get parameterTypes() {
		return [this.#parameterType];
	}

	format(): string {
		const formattedParameterType = this.#parameterType.format();
		return `${formattedParameterType}[]`;
	}

}
