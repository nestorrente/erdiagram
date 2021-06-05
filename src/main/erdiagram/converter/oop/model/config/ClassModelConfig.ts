import IdNamingStrategy from '@/erdiagram/converter/common/id-naming-strategy/IdNamingStrategy';

export default interface ClassModelConfig {
	idNamingStrategy: IdNamingStrategy;
}

export type PartialClassModelConfig = Partial<ClassModelConfig>;
