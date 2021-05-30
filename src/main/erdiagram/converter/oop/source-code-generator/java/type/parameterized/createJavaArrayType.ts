import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';
import JavaParameterizedType
	from '@/erdiagram/converter/oop/source-code-generator/java/type/parameterized/JavaParameterizedType';

export default function createJavaArrayType(parameterType: JavaType): JavaParameterizedType {
	return new JavaArrayTypeImpl(parameterType);
}

class JavaArrayTypeImpl implements JavaParameterizedType {

	readonly #name: string;
	readonly #canonicalName: string;
	readonly #parameterType: JavaType;

	constructor(parameterType: JavaType) {
		this.#name = `${parameterType.name}[]`;
		this.#canonicalName = `${parameterType.canonicalName}[]`;
		this.#parameterType = parameterType;
	}

	get canonicalName() {
		return this.#canonicalName;
	}

	get name() {
		return this.#name;
	}

	get packageName() {
		return undefined;
	}

	get parameterTypes() {
		return [this.#parameterType];
	}

	formatSimple() {
		const formattedParameterType = this.#parameterType.formatSimple();
		return `${formattedParameterType}[]`;
	}

	formatCanonical() {
		const formattedParameterType = this.#parameterType.formatCanonical();
		return `${formattedParameterType}[]`;
	}

}
