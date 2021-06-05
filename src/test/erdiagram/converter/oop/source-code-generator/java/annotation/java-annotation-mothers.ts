import JavaAnnotation, {JavaAnnotationParametersRecord} from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import parseJavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/parseJavaType';

export function createJavaAnnotation(type: string, parameters?: JavaAnnotationParametersRecord) {
	return new JavaAnnotation(parseJavaType(type), parameters);
}