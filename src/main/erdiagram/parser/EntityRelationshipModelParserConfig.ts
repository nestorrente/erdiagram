export default interface EntityRelationshipModelParserConfig {
	allowUnknownEntities: boolean;
}

export const defaultEntityRelationshipModelParserConfig: EntityRelationshipModelParserConfig = {
	allowUnknownEntities: false
};

export function mergeEntityRelationshipModelParserConfigs(
		fullConfig: EntityRelationshipModelParserConfig,
		partialConfig?: Partial<EntityRelationshipModelParserConfig>
): EntityRelationshipModelParserConfig {
	return {
		...defaultEntityRelationshipModelParserConfig,
		...partialConfig
	};
}

export function mergeWithDefaultEntityRelationshipModelParserConfig(
		config?: Partial<EntityRelationshipModelParserConfig>
): EntityRelationshipModelParserConfig {
	return mergeEntityRelationshipModelParserConfigs(defaultEntityRelationshipModelParserConfig, config);
}
