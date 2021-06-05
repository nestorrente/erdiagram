import CaseFormat from '@/erdiagram/converter/common/case-format/CaseFormat';

export default interface JpaConfig {
	tableNameCaseFormat: CaseFormat;
	columnNameCaseFormat: CaseFormat;
	annotateGetters: boolean;
	useExplicitTableName: boolean;
	useExplicitColumnName: boolean;
}

export type PartialJpaConfig = Partial<JpaConfig>;
