import { JavaVisibility } from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';

export default function prependVisibility(text: string, visibility: JavaVisibility): string {
	if (visibility === JavaVisibility.PACKAGE_PRIVATE) {
		return text;
	}
	return visibility + ' ' + text;
}
