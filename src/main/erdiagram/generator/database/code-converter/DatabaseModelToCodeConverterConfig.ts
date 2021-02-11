import CaseFormat from '@/erdiagram/generator/common/case-format/CaseFormat';
import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default interface DatabaseModelToCodeConverterConfig {
	idColumnType: EntityPropertyType;
	typeMappings: Partial<Record<EntityPropertyType, string>>;
	tableNameCaseFormat: CaseFormat;
	columnNameCaseFormat: CaseFormat;
	// FIXME quizás para las constraint, más que un CaseFormat, tenga sentido un strategy de cómo generar su nombre
	// constraintNameCaseFormat: CaseFormat;
}
