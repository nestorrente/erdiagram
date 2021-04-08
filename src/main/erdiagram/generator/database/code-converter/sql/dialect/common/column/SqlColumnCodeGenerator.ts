import {TableColumnDescriptor} from '@/erdiagram/generator/database/model/database-model-types';
import {RegularColumnCode} from '@/erdiagram/generator/database/code-converter/sql/dialect/common/sql-script-types';

export default interface SqlColumnCodeGenerator {
	generateColumnCode(outputTableName: string, column: TableColumnDescriptor): RegularColumnCode;
}
