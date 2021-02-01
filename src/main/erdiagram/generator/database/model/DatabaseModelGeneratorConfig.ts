export default interface DatabaseModelGeneratorConfig {
	pluralizeTableNames: boolean;
}

export const defaultDatabaseModelGeneratorConfig: DatabaseModelGeneratorConfig = {
	pluralizeTableNames: false
};

export function mergeWithDefaultDatabaseModelGeneratorConfig(
		config?: Partial<DatabaseModelGeneratorConfig>
): DatabaseModelGeneratorConfig {
	return {
		...defaultDatabaseModelGeneratorConfig,
		...config
	};
}
