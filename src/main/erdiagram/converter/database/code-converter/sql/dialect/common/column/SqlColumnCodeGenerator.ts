import {TableColumnDescriptor} from '@/erdiagram/converter/database/model/database-model-types';
import {RegularColumnCode} from '@/erdiagram/converter/database/code-converter/sql/dialect/common/sql-script-types';

export default interface SqlColumnCodeGenerator {
	generateColumnCode(outputTableName: string, column: TableColumnDescriptor): RegularColumnCode;
}
