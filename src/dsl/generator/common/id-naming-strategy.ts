import {uncapitalize} from '@/dsl/util/string-utils';

type IdNamingStrategy = (entityName: string) => string;
export default IdNamingStrategy;

const defaultIdNamingStrategy: IdNamingStrategy = () => 'id';
const entityNamePrefixIdNamingStrategy: IdNamingStrategy = entityName => `${uncapitalize(entityName)}Id`;

export const StandardIdNamingStrategies = {
	DEFAULT: defaultIdNamingStrategy,
	ENTITY_NAME_PREFIX: entityNamePrefixIdNamingStrategy
};
