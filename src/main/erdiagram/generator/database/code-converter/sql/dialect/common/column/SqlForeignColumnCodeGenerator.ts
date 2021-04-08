import {TableReferenceDescriptor} from '@/erdiagram/generator/database/model/database-model-types';
import {ForeignKeyColumnCode} from '@/erdiagram/generator/database/code-converter/sql/dialect/common/sql-script-types';

export default interface SqlForeignColumnCodeGenerator {
	generateForeignColumnCode(outputTableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode;
}
