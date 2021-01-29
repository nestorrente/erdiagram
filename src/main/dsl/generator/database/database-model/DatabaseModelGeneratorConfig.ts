export default interface DatabaseModelGeneratorConfig {
	pluralizeTableNames: boolean;
}

export const defaultDatabaseModelGeneratorConfig: DatabaseModelGeneratorConfig = {
	pluralizeTableNames: false
};

export function mergeWithDefaultConfig(config?: Partial<DatabaseModelGeneratorConfig>): DatabaseModelGeneratorConfig {
	return {
		...defaultDatabaseModelGeneratorConfig,
		...config
	};
}
