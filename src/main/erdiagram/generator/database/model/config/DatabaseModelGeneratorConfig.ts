import IdNamingStrategy from '@/erdiagram/generator/common/id-naming-strategy/IdNamingStrategy';

export default interface DatabaseModelGeneratorConfig {
	usePluralTableNames: boolean;
	idNamingStrategy: IdNamingStrategy;
}
