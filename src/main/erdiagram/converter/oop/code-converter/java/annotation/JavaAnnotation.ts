import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import formatJavaAnnotation from '@/erdiagram/converter/oop/code-converter/java/annotation/utils/formatJavaAnnotation';
import RawAnnotationParameterValue, {
	createRawParameterValue,
	isRawParameterValue
} from '@/erdiagram/converter/oop/code-converter/java/annotation/utils/RawAnnotationParameterValue';

export type JavaAnnotationParametersRecord = Record<string, JavaAnnotationParameterValue | undefined>;
export type JavaAnnotationParameterValue = JavaAnnotationParameterSingleValue | JavaAnnotationParameterSingleValue[];
export type JavaAnnotationParameterSingleValue =
		number
		| boolean
		| string
		| RawAnnotationParameterValue
		| JavaAnnotation;

export default class JavaAnnotation {

	readonly #type: JavaType;
	readonly #parameters: JavaAnnotationParametersRecord;

	constructor(
			annotationType: JavaType,
			parameters: JavaAnnotationParametersRecord = {}
	) {
		this.#type = annotationType;
		this.#parameters = parameters;
	}

	get type() {
		return this.#type;
	}

	get parameters() {
		return this.#parameters;
	}

	public format(): string {
		return formatJavaAnnotation(this);
	}

	static createRawParameterValue = createRawParameterValue;
	static isRawParameterValue = isRawParameterValue;

}
