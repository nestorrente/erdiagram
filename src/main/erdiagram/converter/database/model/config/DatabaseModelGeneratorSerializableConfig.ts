import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';

export default interface DatabaseModelGeneratorSerializableConfig {
	usePluralTableNames: boolean;
	idNamingStrategy: keyof typeof StandardIdNamingStrategies;
}
