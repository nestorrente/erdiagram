import {EntityPropertyDescriptor, EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default class NomnomlEntityPropertyCodeGenerator {

	public generateEntityPropertyCode(property: EntityPropertyDescriptor): string {

		const {
			name,
			type,
			length,
			optional,
			unique
		} = property;

		const typeWithLengthCode = this.getTypeWithLengthCode(type, length);

		const modifiersCode = this.getModifiersCode(optional, unique);

		return `${name}${modifiersCode}: ${typeWithLengthCode}`;

	}

	private getTypeWithLengthCode(type: EntityPropertyType, length: number[]): string {

		if (length.length === 0) {
			return type;
		}

		return `${type}(${length.join(', ')})`;

	}

	private getModifiersCode(optional: boolean, unique: boolean) {

		const optionalModifierCode = optional ? '?' : '';
		const uniqueModifierCode = unique ? '!' : '';

		return optionalModifierCode + uniqueModifierCode;

	}

}
