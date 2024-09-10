import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import TypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptType';
import TypeScriptParameterizedType
	from '@/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/TypeScriptParameterizedType';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import FieldTypeResolver from '@/erdiagram/converter/oop/source-code-generator/common/type/FieldTypeResolver';
import createTypeScriptArrayType
	from '@/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/createTypeScriptArrayType';
import createTypeScriptSimpleType
	from '@/erdiagram/converter/oop/source-code-generator/typescript/type/simple/createTypeScriptSimpleType';

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

			return createTypeScriptSimpleType(entityType);

		}

		if (!primitiveType) {
			throw new Error('Invalid field descriptor: missing type');
		}

		/* istanbul ignore next */
		if (!Object.hasOwn(this.typeBindings, primitiveType)) {
			throw new Error('Unsupported type: ' + primitiveType);
		}

		return this.typeBindings[primitiveType]!;

	}

}
