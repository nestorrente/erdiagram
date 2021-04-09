import IdNamingStrategy from '@/erdiagram/converter/common/id-naming-strategy/IdNamingStrategy';

export default interface DatabaseModelGeneratorConfig {
	usePluralTableNames: boolean;
	idNamingStrategy: IdNamingStrategy;
}
