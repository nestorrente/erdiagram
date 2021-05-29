import {
	JavaClass,
	JavaField,
	JavaFieldGetter,
	JavaFieldSetter,
	JavaVisibility
} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import parseJavaType from '@/erdiagram/converter/oop/code-converter/java/type/parseJavaType';

export type PartialJavaClass = Partial<Omit<JavaClass, 'name'>>

export function createJavaClass(name: string, options?: PartialJavaClass): JavaClass {
	return {
		packageName: options?.packageName,
		annotations: options?.annotations ?? [],
		visibility: options?.visibility ?? JavaVisibility.PUBLIC,
		name,
		fields: options?.fields ?? []
	};
}

export type PartialJavaField = Partial<Omit<JavaField, 'name' | 'type'>>

export function createJavaField(name: string, type: string, options?: PartialJavaField): JavaField {
	return {
		annotations: options?.annotations ?? [],
		visibility: options?.visibility ?? JavaVisibility.PRIVATE,
		type: parseJavaType(type),
		name,
		getter: options?.getter,
		setter: options?.setter
	};
}

export type PartialJavaFieldGetter = Partial<Omit<JavaFieldGetter, 'name' | 'type'>>

export function createJavaGetter(name: string, options?: PartialJavaFieldGetter): JavaFieldGetter {
	return {
		annotations: options?.annotations ?? [],
		visibility: options?.visibility ?? JavaVisibility.PUBLIC,
		name
	};
}

export type PartialJavaFieldSetter = Partial<Omit<JavaFieldSetter, 'name' | 'type'>>

export function createJavaSetter(name: string, options?: PartialJavaFieldSetter): JavaFieldSetter {
	return {
		annotations: options?.annotations ?? [],
		visibility: options?.visibility ?? JavaVisibility.PUBLIC,
		name
	};
}
