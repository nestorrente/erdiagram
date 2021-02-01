import databaseModelGenerator, {DatabaseModelGenerator} from '@/erdiagram/generator/database/model/DatabaseModelGenerator';
import DatabaseModelGeneratorConfig, {
	defaultDatabaseModelGeneratorConfig,
	mergeWithDefaultConfig
} from '@/erdiagram/generator/database/model/DatabaseModelGeneratorConfig';

export * from './database-model-types';

export {
	DatabaseModelGenerator,
	databaseModelGenerator,
	DatabaseModelGeneratorConfig,
	defaultDatabaseModelGeneratorConfig,
	mergeWithDefaultConfig
};
