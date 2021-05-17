import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';

export default interface ClassModelGeneratorSerializableConfig {
	idNamingStrategy: keyof typeof StandardIdNamingStrategies;
}
