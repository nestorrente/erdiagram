import IdNamingStrategy from '@/erdiagram/generator/common/id-naming-strategy/IdNamingStrategy';
import CaseFormat from '@/erdiagram/generator/common/case-format/CaseFormat';
import {EntityPropertyType} from '@/erdiagram/parser/statement/statement-types-parse-functions';

export default interface DatabaseModelToCodeConverterConfig {
	idColumnType: EntityPropertyType;
	idNamingStrategy: IdNamingStrategy;
	typesMap: Record<EntityPropertyType, string>;
	tableNameCaseFormat: CaseFormat;
	columnNameCaseFormat: CaseFormat;
	// FIXME quizás para las constraint, más que un CaseFormat, tenga sentido un strategy de cómo generar su nombre
	// constraintNameCaseFormat: CaseFormat;
}
