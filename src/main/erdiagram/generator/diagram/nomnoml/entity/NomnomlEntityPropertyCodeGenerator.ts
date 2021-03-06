import {EntityPropertyDescriptor, EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default class NomnomlEntityPropertyCodeGenerator {

	public generateEntityPropertyCode(property: EntityPropertyDescriptor): string {

		const {
			name,
			type,
			length,
			optional,
			unique,
			autoincremental
		} = property;

		const typeWithLengthCode = this.getTypeWithLengthCode(type, length);

		const modifiersCode = this.getModifiersCode(optional, unique, autoincremental);

		return `  ${name}${modifiersCode}: ${typeWithLengthCode}`;

	}

	private getTypeWithLengthCode(type: EntityPropertyType, length: number[]): string {

		if (length.length === 0) {
			return type;
		}

		return `${type}(${length.join(', ')})`;

	}

	private getModifiersCode(optional: boolean, unique: boolean, autoincremental: boolean) {

		const optionalModifierCode = optional ? '?' : '';
		const uniqueModifierCode = unique ? '!' : '';
		const autoincrementalModifierCode = autoincremental ? '+' : '';

		return optionalModifierCode + uniqueModifierCode + autoincrementalModifierCode;

	}

}
