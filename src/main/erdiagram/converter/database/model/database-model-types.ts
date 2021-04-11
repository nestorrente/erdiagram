import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

export interface DatabaseModel {
	tables: TableDescriptor[];
}

export interface TableDescriptor {
	name: string;
	identityColumnName: string;
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
	targetTableIdentityColumnName: string;
	notNull: boolean;
	unique: boolean;
}
