import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {
	EntityPropertySourceMetadata,
	EntitySourceMetadata,
	RelationshipMemberSourceMetadata,
	RelationshipSourceMetadata
} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-types';

export interface DatabaseModel {
	tables: TableDescriptor[];
}

export interface TableDescriptor {
	name: string;
	identityColumnName: string;
	columns: TableColumnDescriptor[];
	references: TableReferenceDescriptor[];
	sourceMetadata: EntitySourceMetadata | RelationshipSourceMetadata;
}

export interface TableColumnDescriptor {
	name: string;
	notNull: boolean;
	unique: boolean;
	type: EntityPropertyType;
	length: number[];
	sourceMetadata: EntityPropertySourceMetadata;
}

export interface TableReferenceDescriptor {
	columnName: string;
	targetTableName: string;
	targetTableIdentityColumnName: string;
	notNull: boolean;
	unique: boolean;
	sourceMetadata: RelationshipMemberSourceMetadata;
}
