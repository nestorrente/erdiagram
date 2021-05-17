import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';

type JavaAnnotationParameterValue = JavaAnnotationParameterSingleValue | JavaAnnotationParameterSingleValue[];
type JavaAnnotationParameterSingleValue = number | string | JavaAnnotation;

export default class JavaAnnotation {

	readonly #type: JavaType;
	readonly #parameters: Record<string, JavaAnnotationParameterValue>;

	constructor(
			annotationType: JavaType,
			parameters: Record<string, JavaAnnotationParameterValue> = {}
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
		return formatAnnotation(this);
	}

}

function formatAnnotation(annotation: JavaAnnotation): string {

	const simpleName = annotation.type.formatSimple();
	const formattedParams = formatAnnotationParams(annotation.parameters);

	return `@${simpleName}${formattedParams}`;

}

function formatAnnotationParams(annotationParameters: Record<string, JavaAnnotationParameterValue>): string {

	const annotationParamsEntries = Object.entries(annotationParameters);

	if (annotationParamsEntries.length === 0) {
		return '';
	}

	const formattedParams = annotationParamsEntries.map(([paramName, paramValue]) => `${paramName} = ${(formatAnnotationParameterValue(paramValue))}`);

	return `(${formattedParams.join(', ')})`;

}

function formatAnnotationParameterValue(value: JavaAnnotationParameterValue): string {

	if (!Array.isArray(value)) {
		return formatAnnotationParameterSingleValue(value);
	}

	const formattedValues = value.map(formatAnnotationParameterSingleValue);

	return `{${formattedValues.join(', ')}}`;

}

function formatAnnotationParameterSingleValue(value: JavaAnnotationParameterSingleValue): string {
	switch (typeof value) {
		case 'number':
			return String(value);
		case 'string':
			return `"${value}"`;
		default:
			return formatAnnotation(value);
	}
}
