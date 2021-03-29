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

export function createTableReference(columnName: string, targetTableName: string, notNull: boolean = true): TableReferenceDescriptor {
	return {
		columnName,
		targetTableName,
		targetTableIdentifierColumnName: 'id',
		notNull,
		unique: false
	};
}

export function createUniqueTableReference(columnName: string, targetTableName: string, notNull: boolean = true): TableReferenceDescriptor {
	return {
		columnName,
		targetTableName,
		targetTableIdentifierColumnName: 'id',
		notNull,
		unique: true
	};
}
