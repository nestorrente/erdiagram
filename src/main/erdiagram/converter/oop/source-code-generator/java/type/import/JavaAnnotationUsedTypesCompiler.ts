import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import {
	JavaAnnotationParameterSingleValue,
	JavaAnnotationParameterValue
} from '@/erdiagram/converter/oop/source-code-generator/java/annotation/annotation-parameter-types';

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

	private getAnnotationParameterUsedTypes(parameterValue: JavaAnnotationParameterValue): JavaType[] {

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
