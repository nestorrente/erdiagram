import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/converter/database/model/database-model-types';
import {
	ForeignKeyColumnCode,
	IdColumnCode,
	RegularColumnCode
} from '@/erdiagram/converter/database/source-code-generator/sql/dialect/common/sql-script-types';

export default interface SqlDialect {

	getScriptStartCode(): string;

	getScriptEndCode(): string;

	mustUseAlterTableForForeignKeys(): boolean;

	getCreateTableStartCode(tableName: string): string;

	getIdColumnCode(tableName: string, identityColumnName: string): IdColumnCode;

	getColumnCode(tableName: string, column: TableColumnDescriptor): RegularColumnCode;

	getForeignColumnCode(tableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode;

	getCreateTableEndCode(): string

	getAlterTableAddCode(tableName: string, constraintCode: string): string;

}
