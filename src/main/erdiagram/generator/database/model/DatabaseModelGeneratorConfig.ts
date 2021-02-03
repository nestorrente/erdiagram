export default interface DatabaseModelGeneratorConfig {
	pluralizeTableNames: boolean;
}

export const defaultDatabaseModelGeneratorConfig: DatabaseModelGeneratorConfig = {
	pluralizeTableNames: false
};

export function mergeDatabaseModelGeneratorConfigs(
		fullConfig: DatabaseModelGeneratorConfig,
		partialConfig?: Partial<DatabaseModelGeneratorConfig>
): DatabaseModelGeneratorConfig {
	return {
		...fullConfig,
		...partialConfig
	};
}

export function mergeWithDefaultDatabaseModelGeneratorConfig(
		config?: Partial<DatabaseModelGeneratorConfig>
): DatabaseModelGeneratorConfig {
	return mergeDatabaseModelGeneratorConfigs(defaultDatabaseModelGeneratorConfig, config);
}
