import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

export interface DatabaseModel {
	tables: TableDescriptor[];
}

export interface TableDescriptor {
	name: string;
	identifierColumnName: string;
	columns: TableColumnDescriptor[];
	references: TableReferenceDescriptor[];
}

export interface TableColumnDescriptor {
	name: string;
	notNull: boolean;
	unique: boolean;
	type: EntityPropertyType;
	length: number[];
}

export interface TableReferenceDescriptor {
	columnName: string;
	targetTableName: string;
	targetTableIdentifierColumnName: string;
	notNull: boolean;
	unique: boolean;
}