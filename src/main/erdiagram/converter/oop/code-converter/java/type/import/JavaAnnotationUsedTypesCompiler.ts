import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import JavaAnnotation, {
	JavaAnnotationParameterSingleValue,
	JavaAnnotationParameterValue
} from '@/erdiagram/converter/oop/code-converter/java/annotation/JavaAnnotation';

// TODO add unit tests
export default class JavaAnnotationUsedTypesCompiler {

	public getUsedTypes(annotation: JavaAnnotation): JavaType[] {

		const parametersUsedTypes = Object.values(annotation.parameters)
				.filter(parameterValue => parameterValue != null)
				.flatMap(parameterValue => this.getAnnotationParameterUsedTypes(parameterValue!));

		return [
			annotation.type,
			...parametersUsedTypes
		];

	}

	private getAnnotationParameterUsedTypes(parameterValue: JavaAnnotationParameterValue) {

		if (!Array.isArray(parameterValue)) {
			return this.getAnnotationSingleParameterUsedTypes(parameterValue);
		}

		return parameterValue.flatMap(singleParameterValue => this.getAnnotationSingleParameterUsedTypes(singleParameterValue));

	}

	private getAnnotationSingleParameterUsedTypes(parameterValue: JavaAnnotationParameterSingleValue): JavaType[] {

		if (JavaAnnotation.isRawParameterValue(parameterValue)) {
			return parameterValue.usedTypes;
		}

		if (parameterValue instanceof JavaAnnotation) {
			return this.getUsedTypes(parameterValue);
		}

		return [];

	}

}
