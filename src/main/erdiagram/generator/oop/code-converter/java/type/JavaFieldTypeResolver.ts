import {ClassFieldDescriptor} from '@/erdiagram/generator/oop/model/class-model-types';
import JavaType, {createJavaType} from '@/erdiagram/generator/oop/code-converter/java/type/JavaType';
import JavaParameterizedType, {createJavaParameterizedType} from '@/erdiagram/generator/oop/code-converter/java/type/JavaParameterizedType';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default class JavaFieldTypeResolver {

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

			return createJavaType(entityType, this.generatedClassesPackage);

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