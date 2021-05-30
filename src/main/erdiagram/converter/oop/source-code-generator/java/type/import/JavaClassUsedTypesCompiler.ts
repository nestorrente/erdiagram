import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';
import {JavaClass} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import JavaAnnotationUsedTypesCompiler
	from '@/erdiagram/converter/oop/source-code-generator/java/type/import/JavaAnnotationUsedTypesCompiler';

// TODO add unit tests
export default class JavaClassUsedTypesCompiler {

	readonly #javaAnnotationUsedTypesCompiler = new JavaAnnotationUsedTypesCompiler();

	public getUsedTypes(javaClass: JavaClass): JavaType[] {

		const usedTypes: JavaType[] = [];

		usedTypes.push(...this.getAnnotationsUsedTypes(javaClass.annotations));

		javaClass.fields.forEach(javaField => {

			usedTypes.push(javaField.type);

			usedTypes.push(...this.getAnnotationsUsedTypes(javaField.annotations));
			usedTypes.push(...this.getAnnotationsUsedTypes(javaField.getter?.annotations ?? []));
			usedTypes.push(...this.getAnnotationsUsedTypes(javaField.setter?.annotations ?? []));

		});

		return usedTypes;

	}

	private getAnnotationsUsedTypes(annotations: JavaAnnotation[]): JavaType[] {
		return annotations.flatMap(annotation => this.#javaAnnotationUsedTypesCompiler.getUsedTypes(annotation));
	}

}
