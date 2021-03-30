import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/model/database-model-types';

export function createSimpleTableColumn(name: string, type: EntityPropertyType, length: number[] = []): TableColumnDescriptor {
	return {
		name,
		notNull: true,
		autoincremental: false,
		unique: false,
		type,
		length,
	};
}

export function createTableReference(columnName: string, targetTableName: string, options?: Partial<Omit<TableReferenceDescriptor, 'columnName' | 'targetTableName'>>): TableReferenceDescriptor {
	return {
		columnName,
		targetTableName,
		targetTableIdentifierColumnName: options?.targetTableIdentifierColumnName ?? 'id',
		notNull: options?.notNull ?? true,
		unique: options?.unique ?? false
	};
}
