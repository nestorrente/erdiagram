import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';

export default function getAnnotationsLines(annotations: JavaAnnotation[]) {
	return annotations.map(annotation => annotation.format());
}
