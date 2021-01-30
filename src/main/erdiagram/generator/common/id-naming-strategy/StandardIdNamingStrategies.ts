import {uncapitalizeWord} from '@/erdiagram/util/string-utils';
import IdNamingStrategy from '@/erdiagram/generator/common/id-naming-strategy/IdNamingStrategy';

const defaultIdNamingStrategy: IdNamingStrategy = () => 'id';
const entityNamePrefixIdNamingStrategy: IdNamingStrategy = entityName => `${uncapitalizeWord(entityName)}Id`;

const StandardIdNamingStrategies = {
	DEFAULT: defaultIdNamingStrategy,
	ENTITY_NAME_PREFIX: entityNamePrefixIdNamingStrategy
};

export default StandardIdNamingStrategies;
