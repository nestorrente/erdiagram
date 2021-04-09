import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import TypeScriptType, {createTypeScriptType} from '@/erdiagram/converter/oop/code-converter/typescript/type/TypeScriptType';
import TypeScriptParameterizedType, {createTypeScriptArrayType} from '@/erdiagram/converter/oop/code-converter/typescript/type/TypeScriptParameterizedType';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import FieldTypeResolver from '@/erdiagram/converter/oop/code-converter/common/type/FieldTypeResolver';

export default class TypeScriptTypeResolver implements FieldTypeResolver<TypeScriptType> {

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