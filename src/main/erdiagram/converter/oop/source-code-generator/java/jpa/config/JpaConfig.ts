import CaseFormat from '@/erdiagram/converter/common/case-format/CaseFormat';
import JavaExtendedPackage from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage';

export default interface JpaConfig {
	tableNameCaseFormat: CaseFormat;
	columnNameCaseFormat: CaseFormat;
	annotateGetters: boolean;
	useExplicitTableName: boolean;
	useExplicitColumnName: boolean;
	javaExtendedPackage: JavaExtendedPackage;
}

export type PartialJpaConfig = Partial<JpaConfig>;
