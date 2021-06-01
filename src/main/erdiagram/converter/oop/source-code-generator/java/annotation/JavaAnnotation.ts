import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';
import formatJavaAnnotation
	from '@/erdiagram/converter/oop/source-code-generator/java/annotation/utils/formatJavaAnnotation';
import {
	createRawParameterValue,
	isRawParameterValue
} from '@/erdiagram/converter/oop/source-code-generator/java/annotation/utils/RawAnnotationParameterValue';
import {JavaAnnotationParameterValue} from '@/erdiagram/converter/oop/source-code-generator/java/annotation/annotation-parameter-types';

export type JavaAnnotationParametersRecord = Record<string, JavaAnnotationParameterValue | undefined>;

export default class JavaAnnotation {

	private readonly _type: JavaType;
	private readonly _parameters: JavaAnnotationParametersRecord;

	constructor(
			annotationType: JavaType,
			parameters: JavaAnnotationParametersRecord = {}
	) {
		this._type = annotationType;
		this._parameters = parameters;
	}

	get type() {
		return this._type;
	}

	get parameters() {
		return this._parameters;
	}

	public format(): string {
		return formatJavaAnnotation(this);
	}

	static createRawParameterValue = createRawParameterValue;
	static isRawParameterValue = isRawParameterValue;

}
