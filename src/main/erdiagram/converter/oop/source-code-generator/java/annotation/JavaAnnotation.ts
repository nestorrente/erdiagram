import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';
import formatJavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/utils/formatJavaAnnotation';
import {
	createRawParameterValue,
	isRawParameterValue
} from '@/erdiagram/converter/oop/source-code-generator/java/annotation/utils/RawAnnotationParameterValue';
import {JavaAnnotationParameterValue} from '@/erdiagram/converter/oop/source-code-generator/java/annotation/annotation-parameter-types';

export type JavaAnnotationParametersRecord = Record<string, JavaAnnotationParameterValue | undefined>;

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
