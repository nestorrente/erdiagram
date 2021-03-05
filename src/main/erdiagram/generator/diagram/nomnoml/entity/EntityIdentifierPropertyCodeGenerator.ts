import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default class EntityIdentifierPropertyCodeGenerator {

	public generateEntityIdentifierPropertyCode(identifierPropertyName: string): string {
		return `  ${identifierPropertyName}: ${EntityPropertyType.IDENTIFIER}`;
	}

}
