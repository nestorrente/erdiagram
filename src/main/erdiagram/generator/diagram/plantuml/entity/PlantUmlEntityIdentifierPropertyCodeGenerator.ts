import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default class PlantUmlEntityIdentifierPropertyCodeGenerator {

	public generateEntityIdentifierPropertyCode(identifierPropertyName: string): string {
		return `{field} ${identifierPropertyName}: ${EntityPropertyType.IDENTIFIER}`;
	}

}
