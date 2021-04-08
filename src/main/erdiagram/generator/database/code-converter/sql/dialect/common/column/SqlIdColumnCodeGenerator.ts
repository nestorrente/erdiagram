import {IdColumnCode} from '@/erdiagram/generator/database/code-converter/sql/dialect/common/sql-script-types';

export default interface SqlIdColumnCodeGenerator {
	generateIdColumnCode(outputTableName: string, identifierColumnName: string): IdColumnCode;
}
