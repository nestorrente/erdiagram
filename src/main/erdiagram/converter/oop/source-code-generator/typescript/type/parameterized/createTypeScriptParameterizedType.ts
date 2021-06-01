import TypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptType';
import TypeScriptParameterizedType
	from '@/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/TypeScriptParameterizedType';

export default function createTypeScriptParameterizedType(name: string, parameterTypes: TypeScriptType[]): TypeScriptParameterizedType {
	return new TypeScriptParameterizedTypeImpl(name, parameterTypes);
}

class TypeScriptParameterizedTypeImpl implements TypeScriptParameterizedType {

	private readonly _name: string;
	private readonly _parameterTypes: TypeScriptType[];

	constructor(name: string, parameterTypes: TypeScriptType[]) {
		this._name = name;
		this._parameterTypes = parameterTypes;
	}

	get name() {
		return this._name;
	}

	get parameterTypes() {
		return this._parameterTypes;
	}

	format(): string {
		const formattedParameterTypes = this._parameterTypes.map(parameterType => parameterType.format()).join(', ');
		return `${this._name}<${formattedParameterTypes}>`;
	}

}
