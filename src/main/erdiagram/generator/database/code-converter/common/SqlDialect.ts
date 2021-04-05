import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/model/database-model-types';
import {
	ForeignKeyColumnCode,
	IdColumnCode,
	RegularColumnCode
} from '@/erdiagram/generator/database/code-converter/common/sql-script-types';

export default interface SqlDialect {

	startTable(tableName: string): string;

	addIdColumn(tableName: string, identifierColumnName: string): IdColumnCode;

	addColumn(tableName: string, column: TableColumnDescriptor): RegularColumnCode;

	addForeignColumn(tableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode;

	endTable(): string

	addConstraint(tableName: string, constraintCode: string): string;

}
