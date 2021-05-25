import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import {JavaField, JavaVisibility} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import JavaFieldTypeResolver from '@/erdiagram/converter/oop/code-converter/java/type/JavaFieldTypeResolver';
import {capitalizeWord} from '@/erdiagram/util/string-utils';
import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';

export default class JavaFieldGenerator {

	readonly #typeResolver: JavaFieldTypeResolver;

	constructor(typeResolver: JavaFieldTypeResolver) {
		this.#typeResolver = typeResolver;
	}

	public generateJavaField(fieldDescriptor: ClassFieldDescriptor): JavaField {

		const fieldType = this.#typeResolver.resolveFieldType(fieldDescriptor);

		return {
			visibility: JavaVisibility.PRIVATE,
			name: fieldDescriptor.name,
			type: fieldType,
			annotations: [],
			getter: {
				visibility: JavaVisibility.PUBLIC,
				annotations: [],
				name: this.getGetterName(fieldDescriptor.name, fieldType)
			},
			setter: {
				visibility: JavaVisibility.PUBLIC,
				annotations: [],
				name: this.getSetterName(fieldDescriptor.name)
			},
		};

	}

	private getGetterName(fieldName: string, fieldType: JavaType) {
		const capitalizedFieldName = capitalizeWord(fieldName);
		return this.isBooleanType(fieldType) ? `is${capitalizedFieldName}` : `get${capitalizedFieldName}`;
	}

	private isBooleanType(fieldType: JavaType) {
		return fieldType.formatCanonical() === 'boolean';
	}

	private getSetterName(fieldName: string) {
		const capitalizedFieldName = capitalizeWord(fieldName);
		return `set${capitalizedFieldName}`;
	}

}
