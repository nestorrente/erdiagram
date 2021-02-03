import DatabaseModelGenerator from '@/erdiagram/generator/database/model/DatabaseModelGenerator';
import DatabaseModelGeneratorConfig, {
	defaultDatabaseModelGeneratorConfig,
	mergeDatabaseModelGeneratorConfigs,
	mergeWithDefaultDatabaseModelGeneratorConfig
} from '@/erdiagram/generator/database/model/DatabaseModelGeneratorConfig';

export * from './database-model-types';

export {
	DatabaseModelGenerator,
	DatabaseModelGeneratorConfig,
	defaultDatabaseModelGeneratorConfig,
	mergeDatabaseModelGeneratorConfigs,
	mergeWithDefaultDatabaseModelGeneratorConfig
};
