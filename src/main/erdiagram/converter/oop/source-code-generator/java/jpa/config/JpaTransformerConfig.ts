import CaseFormat from '@/erdiagram/converter/common/case-format/CaseFormat';

export default interface JpaTransformerConfig {
	tableNameCaseFormat: CaseFormat;
	columnNameCaseFormat: CaseFormat;
	annotateGetters: boolean;
	// TODO add properties for indicating whether the @Table and @Column annotations should be used or not
}

export type PartialJpaTransformerConfig = Partial<JpaTransformerConfig>;
