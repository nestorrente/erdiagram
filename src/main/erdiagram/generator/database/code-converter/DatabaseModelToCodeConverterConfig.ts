import IdNamingStrategy from '@/erdiagram/generator/common/id-naming-strategy/IdNamingStrategy';
import CaseFormat from '@/erdiagram/generator/common/case-format/CaseFormat';
import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default interface DatabaseModelToCodeConverterConfig {
	idColumnType: EntityPropertyType;
	idNamingStrategy: IdNamingStrategy;
	typesMap: Partial<Record<EntityPropertyType, string>>;
	tableNameCaseFormat: CaseFormat;
	columnNameCaseFormat: CaseFormat;
	// FIXME quizás para las constraint, más que un CaseFormat, tenga sentido un strategy de cómo generar su nombre
	// constraintNameCaseFormat: CaseFormat;
}
