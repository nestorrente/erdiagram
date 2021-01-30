import IdNamingStrategy from '@/erdiagram/generator/common/id-naming-strategy/IdNamingStrategy';
import CaseFormat from '@/erdiagram/generator/common/case-format/CaseFormat';
import {EntityPropertyType} from '@/erdiagram/parser/statement/statement-types-parse-functions';

export default interface DatabaseModelToCodeConverterConfig {
	idColumnType: EntityPropertyType;
	idNamingStrategy: IdNamingStrategy;
	typesMap: Record<string, string>;
	tableNameCaseFormat: CaseFormat;
	columnCaseFormat: CaseFormat;
	// FIXME quizás para las constraint, más que un CaseFormat, tenga sentido un strategy de cómo generar su nombre
	// constraintCaseFormat: CaseFormat;
}
