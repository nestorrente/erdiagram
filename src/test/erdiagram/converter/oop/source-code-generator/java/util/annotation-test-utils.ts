import {
	JavaAnnotatedElement,
	JavaClass
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';

export function checkClassFieldsAnnotations(javaClass: JavaClass, classFieldsAnnotations: Record<string, string[]>) {

	const classFieldsAnnotationsEntries = Object.entries(classFieldsAnnotations);

	classFieldsAnnotationsEntries.forEach(([fieldName, annotationsCode]) => {

		const field = javaClass.fields.find(field => field.name === fieldName);

		if (field == null) {
			throw new Error(`Field ${fieldName} doesn't exists in class ${javaClass.name}`);
		}

		checkAnnotations(field, annotationsCode);

	});

}

export function checkClassGettersAnnotations(javaClass: JavaClass, classFieldsAnnotations: Record<string, string[]>) {

	const classFieldsAnnotationsEntries = Object.entries(classFieldsAnnotations);

	classFieldsAnnotationsEntries.forEach(([fieldName, annotationsCode]) => {

		const field = javaClass.fields.find(field => field.name === fieldName);

		if (field == null) {
			throw new Error(`Field ${fieldName} doesn't exists in class ${javaClass.name}`);
		}

		expect(field.getter).toBeDefined();
		checkAnnotations(field.getter!, annotationsCode);

	});

}

export function checkAnnotations(annotatedElement: JavaAnnotatedElement, annotationsCode: string[]) {
	expect(formatAnnotations(annotatedElement)).toStrictEqual(annotationsCode);
}

function formatAnnotations(annotatedElement: JavaAnnotatedElement) {
	return annotatedElement.annotations.map(annotations => annotations.format());
}
