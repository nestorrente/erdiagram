import RawAnnotationParameterValue
	from '@/erdiagram/converter/oop/code-converter/java/annotation/utils/RawAnnotationParameterValue';
import JavaAnnotation from '@/erdiagram/converter/oop/code-converter/java/annotation/JavaAnnotation';

export type JavaAnnotationParameterValue = JavaAnnotationParameterSingleValue | JavaAnnotationParameterSingleValue[];
export type JavaAnnotationParameterSingleValue =
		number
		| boolean
		| string
		| RawAnnotationParameterValue
		| JavaAnnotation;
