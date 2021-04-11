import {IdColumnCode} from '@/erdiagram/converter/database/code-converter/sql/dialect/common/sql-script-types';

export default interface SqlIdColumnCodeGenerator {
	generateIdColumnCode(outputTableName: string, identityColumnName: string): IdColumnCode;
}
