import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default class NomnomlEntityIdentifierPropertyCodeGenerator {

	public generateEntityIdentifierPropertyCode(identifierPropertyName: string): string {
		return `  ${identifierPropertyName}: ${EntityPropertyType.IDENTIFIER}`;
	}

}
