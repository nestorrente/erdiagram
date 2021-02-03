export default interface EntityRelationshipModelParserConfig {
	allowUnknownEntities: boolean;
}

export const defaultEntityRelationshipModelParserConfig: EntityRelationshipModelParserConfig = {
	allowUnknownEntities: false
};

export function mergeWithDefaultEntityRelationshipModelParserConfig(
		config?: Partial<EntityRelationshipModelParserConfig>
): EntityRelationshipModelParserConfig {
	return {
		...defaultEntityRelationshipModelParserConfig,
		...config
	};
}
