import CaseFormat from '@/erdiagram/converter/common/case-format/CaseFormat';

export default interface JpaTransformerConfig {
	tableNameCaseFormat: CaseFormat;
	columnNameCaseFormat: CaseFormat;
	annotateGetters: boolean;
	useExplicitTableName: boolean;
	useExplicitColumnName: boolean;
}

export type PartialJpaTransformerConfig = Partial<JpaTransformerConfig>;
