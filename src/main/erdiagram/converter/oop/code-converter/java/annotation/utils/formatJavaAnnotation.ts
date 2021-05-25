import JavaAnnotation, {
	JavaAnnotationParameterSingleValue,
	JavaAnnotationParametersRecord,
	JavaAnnotationParameterValue
} from '@/erdiagram/converter/oop/code-converter/java/annotation/JavaAnnotation';

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
