import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export interface DatabaseModel {
	tables: TableDescriptor[];
}

export interface TableDescriptor {
	name: string;
	columns: TableColumnDescriptor[];
	references: TableReferenceDescriptor[];
}

export interface TableColumnDescriptor {
	name: string;
	notNull: boolean;
	autoincremental: boolean;
	unique: boolean;
	type: EntityPropertyType;
	length: number[];
}

export interface TableReferenceDescriptor {
	columnName: string;
	targetTableName: string;
	notNull: boolean;
	unique: boolean;
}
