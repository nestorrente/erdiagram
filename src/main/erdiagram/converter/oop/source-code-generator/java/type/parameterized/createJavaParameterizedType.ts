import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';
import JavaParameterizedType
	from '@/erdiagram/converter/oop/source-code-generator/java/type/parameterized/JavaParameterizedType';

export default function createJavaParameterizedType(name: string, packageName: string | undefined, parameterTypes: JavaType[]): JavaParameterizedType {
	return new JavaParameterizedTypeImpl(name, packageName, parameterTypes);
}

class JavaParameterizedTypeImpl implements JavaParameterizedType {

	readonly #name: string;
	readonly #packageName?: string;
	readonly #canonicalName: string;
	readonly #parameterTypes: JavaType[];

	constructor(name: string, packageName: string | undefined, parameterTypes: JavaType[]) {
		this.#name = name;
		this.#packageName = packageName;
		this.#canonicalName = packageName ? `${packageName}.${name}` : name;
		this.#parameterTypes = parameterTypes;
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

	get parameterTypes() {
		return this.#parameterTypes;
	}

	formatSimple() {
		const formattedParameterTypes = this.#parameterTypes.map(parameterType => parameterType.formatSimple()).join(', ');
		return `${this.#name}<${formattedParameterTypes}>`;
	}

	formatCanonical() {
		const formattedParameterTypes = this.#parameterTypes.map(parameterType => parameterType.formatCanonical()).join(', ');
		return `${this.#canonicalName}<${formattedParameterTypes}>`;
	}

}
