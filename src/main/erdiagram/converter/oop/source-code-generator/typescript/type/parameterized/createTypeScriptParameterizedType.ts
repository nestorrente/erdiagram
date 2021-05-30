import TypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptType';
import TypeScriptParameterizedType
	from '@/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/TypeScriptParameterizedType';

export default function createTypeScriptParameterizedType(name: string, parameterTypes: TypeScriptType[]): TypeScriptParameterizedType {
	return new TypeScriptParameterizedTypeImpl(name, parameterTypes);
}

class TypeScriptParameterizedTypeImpl implements TypeScriptParameterizedType {

	readonly #name: string;
	readonly #parameterTypes: TypeScriptType[];

	constructor(name: string, parameterTypes: TypeScriptType[]) {
		this.#name = name;
		this.#parameterTypes = parameterTypes;
	}

	get name() {
		return this.#name;
	}

	get parameterTypes() {
		return this.#parameterTypes;
	}

	format(): string {
		const formattedParameterTypes = this.#parameterTypes.map(parameterType => parameterType.format()).join(', ');
		return `${this.#name}<${formattedParameterTypes}>`;
	}

}
