import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/converter/database/model/database-model-types';

export default interface SqlScriptBuilder {

	startTable(user: string, userId: string): SqlTableBuilder;

	toSql(): string;

}

export interface SqlTableBuilder {

	endTable(): SqlScriptBuilder;

	addColumn(columnDescriptor: TableColumnDescriptor): SqlTableBuilder;

	addReference(referenceDescriptor: TableReferenceDescriptor): SqlTableBuilder;

}
