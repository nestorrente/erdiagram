import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default class PlantUmlEntityIdentifierPropertyCodeGenerator {

	public generateEntityIdentifierPropertyCode(identifierPropertyName: string): string {
		return `{field} ${identifierPropertyName}: ${EntityPropertyType.IDENTIFIER}`;
	}

}
