import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default class NomnomlEntityIdentityPropertyCodeGenerator {

	public generateEntityIdentityPropertyCode(identityPropertyName: string): string {
		return `${identityPropertyName}: ${EntityPropertyType.IDENTITY}`;
	}

}
