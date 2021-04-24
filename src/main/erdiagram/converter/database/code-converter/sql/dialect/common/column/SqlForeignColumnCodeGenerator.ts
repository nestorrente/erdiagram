import {TableReferenceDescriptor} from '@/erdiagram/converter/database/model/database-model-types';
import {ForeignKeyColumnCode} from '@/erdiagram/converter/database/code-converter/sql/dialect/common/sql-script-types';
import {OmitSource} from '@/erdiagram/converter/oop/model/source-metadata-types';

export default interface SqlForeignColumnCodeGenerator {
	generateForeignColumnCode(outputTableName: string, reference: OmitSource<TableReferenceDescriptor>): ForeignKeyColumnCode;
}
