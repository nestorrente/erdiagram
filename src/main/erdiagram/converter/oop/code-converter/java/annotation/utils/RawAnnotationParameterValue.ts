import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import {JavaAnnotationParameterValue} from '@/erdiagram/converter/oop/code-converter/java/annotation/annotation-parameter-types';

const RAW_ANNOTATION_PARAMETER_VALUE_SYMBOL = Symbol('RawAnnotationParameterValue');

export default interface RawAnnotationParameterValue {
	[RAW_ANNOTATION_PARAMETER_VALUE_SYMBOL]: true;
	code: string;
	usedTypes: JavaType[];
}

export function createRawParameterValue(code: string, ...usedTypes: JavaType[]): RawAnnotationParameterValue {
	return {
		[RAW_ANNOTATION_PARAMETER_VALUE_SYMBOL]: true,
		code,
		usedTypes
	};
}

export function isRawParameterValue(value: JavaAnnotationParameterValue): value is RawAnnotationParameterValue {
	return value != null && typeof value === 'object' && (value as RawAnnotationParameterValue)[RAW_ANNOTATION_PARAMETER_VALUE_SYMBOL];
}
