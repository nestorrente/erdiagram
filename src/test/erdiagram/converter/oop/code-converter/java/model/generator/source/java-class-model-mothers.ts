import {
	JavaClass,
	JavaField,
	JavaVisibility
} from '../../../../../../../../../main/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
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
