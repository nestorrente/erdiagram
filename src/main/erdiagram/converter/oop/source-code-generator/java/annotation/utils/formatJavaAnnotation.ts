import JavaAnnotation, {JavaAnnotationParametersRecord} from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import {
	JavaAnnotationParameterSingleValue,
	JavaAnnotationParameterValue
} from '@/erdiagram/converter/oop/source-code-generator/java/annotation/annotation-parameter-types';

const VALUE_PARAMETER_NAME = 'value';

export default function formatJavaAnnotation(annotation: JavaAnnotation): string {

	const simpleName = annotation.type.formatSimple();
	const formattedParams = formatAnnotationParameters(annotation.parameters);

	return `@${simpleName}${formattedParams}`;

}

function formatAnnotationParameters(annotationParameters: JavaAnnotationParametersRecord): string {

	const annotationParamsEntries = Object.entries(annotationParameters)
			.filter(([, paramValue]) => paramValue != null) as [string, JavaAnnotationParameterValue][];

	if (annotationParamsEntries.length === 0) {
		return '';
	}

	const formattedParams = formatAnnotationParametersEntries(annotationParamsEntries);

	return `(${formattedParams})`;

}

function formatAnnotationParametersEntries(annotationParamsEntries: [string, JavaAnnotationParameterValue][]): string {

	if (hasOnlyValueParameter(annotationParamsEntries)) {
		const [[, value]] = annotationParamsEntries;
		return formatAnnotationParameterValue(value);
	}

	return annotationParamsEntries.map(formatAnnotationParameterEntry).join(', ');

}

function formatAnnotationParameterEntry(paramEntry: [string, JavaAnnotationParameterValue]) {

	const [paramName, paramValue] = paramEntry;

	const formattedValue = formatAnnotationParameterValue(paramValue);

	return `${paramName} = ${formattedValue}`;

}

function hasOnlyValueParameter(annotationParamsEntries: [string, JavaAnnotationParameterValue][]) {

	if (annotationParamsEntries.length !== 1) {
		return false;
	}

	const [[key]] = annotationParamsEntries;

	return key === VALUE_PARAMETER_NAME;

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
		case 'boolean':
			return String(value);
		case 'string':
			return `"${value}"`;
		default:
			if (JavaAnnotation.isRawParameterValue(value)) {
				return value.code;
			}
			return formatJavaAnnotation(value);
	}
}
