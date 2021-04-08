import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/model/database-model-types';
import {
	ForeignKeyColumnCode,
	IdColumnCode,
	RegularColumnCode
} from '@/erdiagram/generator/database/code-converter/sql/dialect/common/sql-script-types';

export default interface SqlDialect {

	getCreateTableStartCode(tableName: string): string;

	getIdColumnCode(tableName: string, identifierColumnName: string): IdColumnCode;

	getColumnCode(tableName: string, column: TableColumnDescriptor): RegularColumnCode;

	getForeignColumnCode(tableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode;

	getCreateTableEndCode(): string

	getAlterTableAddCode(tableName: string, constraintCode: string): string;

}
