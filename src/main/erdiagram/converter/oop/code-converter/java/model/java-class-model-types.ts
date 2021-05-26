import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import JavaAnnotation from '@/erdiagram/converter/oop/code-converter/java/annotation/JavaAnnotation';

export interface JavaClassModel {
	classes: JavaClass[];
}

export interface JavaAnnotatedElement {
	annotations: JavaAnnotation[];
}

export interface JavaAccessibleElement {
	visibility: JavaVisibility;
}

export enum JavaVisibility {
	PRIVATE = 'private',
	PROTECTED = 'protected',
	PUBLIC = 'public',
	PACKAGE_PRIVATE = 'package-private'
}

export interface JavaClass extends JavaAnnotatedElement, JavaAccessibleElement {
	packageName?: string;
	name: string;
	fields: JavaField[];
}

export interface JavaField extends JavaAnnotatedElement, JavaAccessibleElement {
	name: string;
	type: JavaType;
	getter?: JavaFieldGetter;
	setter?: JavaFieldSetter;
}

export interface JavaFieldGetter extends JavaAnnotatedElement, JavaAccessibleElement {
	name: string;
}

export interface JavaFieldSetter extends JavaAnnotatedElement, JavaAccessibleElement {
	name: string;
}
