import {IdColumnCode} from '@/erdiagram/converter/database/source-code-generator/sql/dialect/common/sql-script-types';

export default interface SqlIdColumnCodeGenerator {
	generateIdColumnCode(outputTableName: string, identityColumnName: string): IdColumnCode;
}
