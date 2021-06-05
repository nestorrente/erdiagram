import IdNamingStrategy from '@/erdiagram/converter/common/id-naming-strategy/IdNamingStrategy';

export default interface DatabaseModelConfig {
	usePluralTableNames: boolean;
	idNamingStrategy: IdNamingStrategy;
}

export type PartialDatabaseModelConfig = Partial<DatabaseModelConfig>;
