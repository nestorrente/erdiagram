import {ClassFieldDescriptor} from '@/erdiagram/generator/oop/model/class-model-types';
import TypeScriptType, {createTypeScriptType} from '@/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType';
import TypeScriptParameterizedType, {createTypeScriptArrayType} from '@/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptParameterizedType';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default class TypeScriptTypeResolver {

	constructor(
			private readonly typeBindings: Partial<Record<EntityPropertyType, TypeScriptType>>
	) {

	}

	public resolveFieldType(field: ClassFieldDescriptor): TypeScriptType {
		if (field.list) {
			return this.resolveListType(field);
		} else {
			return this.resolveSingleType(field);
		}
	}

	private resolveListType(field: ClassFieldDescriptor): TypeScriptParameterizedType {
		return createTypeScriptArrayType(this.resolveSingleType(field));
	}

	private resolveSingleType(field: ClassFieldDescriptor): TypeScriptType {

		const {
			entityType,
			primitiveType
		} = field;

		if (entityType) {

			if (primitiveType) {
				throw new Error('Invalid field descriptor: provided both primitive and entity types');
			}

			return createTypeScriptType(entityType);

		}

		if (!primitiveType) {
			throw new Error('Invalid field descriptor: missing type');
		}

		if (!this.typeBindings.hasOwnProperty(primitiveType)) {
			throw new Error('Unsupported type: ' + primitiveType);
		}

		return this.typeBindings[primitiveType]!;

	}

}