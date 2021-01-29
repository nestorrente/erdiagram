import IdNamingStrategy from '@/dsl/generator/common/id-naming-strategy';
import CaseFormat from '@/dsl/generator/common/case-format/CaseFormat';
import {EntityPropertyType} from '@/dsl/parser/statement/statement-types-parse-functions';

export default interface DatabaseModelToCodeConverterConfig {
	idColumnType: EntityPropertyType;
	idNamingStrategy: IdNamingStrategy;
	typesMap: Record<string, string>;
	tableCaseFormat: CaseFormat;
	columnCaseFormat: CaseFormat;
	// FIXME quizás para las constraint, más que un CaseFormat, tenga sentido un strategy de cómo generar su nombre
	// constraintCaseFormat: CaseFormat;
}
