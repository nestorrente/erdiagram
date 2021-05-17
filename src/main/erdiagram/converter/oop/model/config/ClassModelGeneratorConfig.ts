import IdNamingStrategy from '@/erdiagram/converter/common/id-naming-strategy/IdNamingStrategy';

export default interface ClassModelGeneratorConfig {
	idNamingStrategy: IdNamingStrategy;
}

export type PartialClassModelGeneratorConfig = Partial<ClassModelGeneratorConfig>;
