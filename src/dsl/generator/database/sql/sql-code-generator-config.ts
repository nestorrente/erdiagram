import {IdNamingStrategy} from '@/dsl/generator/common/id-naming-strategy';

export default interface MySqlCodeGeneratorConfig {
	idNamingStrategy: IdNamingStrategy;
	typesMap: Record<string, string>;
}
