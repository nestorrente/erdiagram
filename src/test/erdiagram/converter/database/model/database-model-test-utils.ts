import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/converter/database/model/database-model-types';

export function createSimpleTableColumn(name: string, type: EntityPropertyType, length: number[] = []): TableColumnDescriptor {
	return {
		name,
		notNull: true,
		unique: false,
		type,
		length,
	};
}

export type PartialTableReferenceDescriptor = Partial<Omit<TableReferenceDescriptor, 'columnName' | 'targetTableName'>>;

export function createTableReference(columnName: string, targetTableName: string, options?: PartialTableReferenceDescriptor): TableReferenceDescriptor {
	return {
		columnName,
		targetTableName,
		targetTableIdentityColumnName: options?.targetTableIdentityColumnName ?? 'id',
		notNull: options?.notNull ?? true,
		unique: options?.unique ?? false
	};
}
