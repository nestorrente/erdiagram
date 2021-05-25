import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import JavaParameterizedType
	from '@/erdiagram/converter/oop/code-converter/java/type/parameterized/JavaParameterizedType';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import FieldTypeResolver from '@/erdiagram/converter/oop/code-converter/common/type/FieldTypeResolver';
import createJavaSimpleType from '@/erdiagram/converter/oop/code-converter/java/type/simple/createJavaSimpleType';
import createJavaParameterizedType
	from '@/erdiagram/converter/oop/code-converter/java/type/parameterized/createJavaParameterizedType';

export default class JavaFieldTypeResolver implements FieldTypeResolver<JavaType> {

	constructor(
			private readonly typeBindings: Partial<Record<EntityPropertyType, JavaType>>,
			private readonly generatedClassesPackage: string | undefined
	) {

	}

	public resolveFieldType(field: ClassFieldDescriptor): JavaType {
		if (field.list) {
			return this.resolveListType(field);
		} else {
			return this.resolveSingleType(field);
		}
	}

	private resolveListType(field: ClassFieldDescriptor): JavaParameterizedType {
		return createJavaParameterizedType(
				'List',
				'java.util',
				[this.resolveSingleType(field)]
		);
	}

	private resolveSingleType(field: ClassFieldDescriptor): JavaType {

		const {
			entityType,
			primitiveType
		} = field;

		if (entityType) {

			if (primitiveType) {
				throw new Error('Invalid field descriptor: provided both primitive and entity types');
			}

			return createJavaSimpleType(entityType, this.generatedClassesPackage);

		}

		if (!primitiveType) {
			throw new Error('Invalid field descriptor: missing type');
		}

		/* istanbul ignore next */
		if (!this.typeBindings.hasOwnProperty(primitiveType)) {
			throw new Error('Unsupported type: ' + primitiveType);
		}

		return this.typeBindings[primitiveType]!;

	}

}
