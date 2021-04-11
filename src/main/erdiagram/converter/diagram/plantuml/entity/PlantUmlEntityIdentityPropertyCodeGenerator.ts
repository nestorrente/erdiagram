import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default class PlantUmlEntityIdentityPropertyCodeGenerator {

	public generateEntityIdentityPropertyCode(identityPropertyName: string): string {
		return `{field} ${identityPropertyName}: ${EntityPropertyType.IDENTITY}`;
	}

}
