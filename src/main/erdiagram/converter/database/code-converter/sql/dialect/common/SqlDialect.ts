import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/converter/database/model/database-model-types';
import {
	ForeignKeyColumnCode,
	IdColumnCode,
	RegularColumnCode
} from '@/erdiagram/converter/database/code-converter/sql/dialect/common/sql-script-types';
import SqlScriptBuilder from '@/erdiagram/converter/database/code-converter/sql/dialect/common/SqlScriptBuilder';

export default interface SqlDialect {

	getScriptStartCode(): string;

	getScriptEndCode(): string;

	mustUseAlterTableForForeignKeys(): boolean;

	getCreateTableStartCode(tableName: string): string;

	getIdColumnCode(tableName: string, identifierColumnName: string): IdColumnCode;

	getColumnCode(tableName: string, column: TableColumnDescriptor): RegularColumnCode;

	getForeignColumnCode(tableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode;

	getCreateTableEndCode(): string

	getAlterTableAddCode(tableName: string, constraintCode: string): string;

	createScriptBuilder?: () => SqlScriptBuilder;

}
