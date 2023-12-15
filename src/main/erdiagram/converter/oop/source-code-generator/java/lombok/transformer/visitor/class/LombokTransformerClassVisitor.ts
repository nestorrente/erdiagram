import { JavaClass } from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import { LombokAnnotationTypes } from '@/erdiagram/converter/oop/source-code-generator/java/lombok/lombok-java-types';
import LombokConfig from '@/erdiagram/converter/oop/source-code-generator/java/lombok/config/LombokConfig';
import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';

export default class LombokTransformerClassVisitor {

	private readonly _config: LombokConfig;

	constructor(config: LombokConfig) {
		this._config = config;
	}

	public visitClass(javaClass: JavaClass): void {

		this.annotateClass(javaClass);

		if (this._config.dataAnnotation || this._config.getterAnnotation) {
			for (const field of javaClass.fields) {
				delete field.getter;
			}
		}

		if (this._config.dataAnnotation || this._config.setterAnnotation) {
			for (const field of javaClass.fields) {
				delete field.setter;
			}
		}

	}

	private annotateClass(javaClass: JavaClass) {
		for (const annotationType of this.getAnnotationTypes()) {
			javaClass.annotations.push(new JavaAnnotation(annotationType));
		}
	}

	private getAnnotationTypes() {

		const annotationTypes: JavaType[] = [];

		if (this._config.builderAnnotation) {
			annotationTypes.push(LombokAnnotationTypes.Builder);
		}

		if (this._config.dataAnnotation) {
			annotationTypes.push(LombokAnnotationTypes.Data);
		}

		if (this._config.getterAnnotation) {
			annotationTypes.push(LombokAnnotationTypes.Getter);
		}

		if (this._config.setterAnnotation) {
			annotationTypes.push(LombokAnnotationTypes.Setter);
		}

		if (this._config.toStringAnnotation) {
			annotationTypes.push(LombokAnnotationTypes.ToString);
		}

		if (this._config.equalsAndHashCodeAnnotation) {
			annotationTypes.push(LombokAnnotationTypes.EqualsAndHashCode);
		}

		return annotationTypes;

	}

}
