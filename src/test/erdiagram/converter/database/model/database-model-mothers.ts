import {
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityPropertyType,
	RelationshipDescriptor,
	RelationshipMember
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {
	TableColumnDescriptor,
	TableDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/converter/database/model/database-model-types';
import {SourceType} from '../../../../../main/erdiagram/converter/oop/model/source-metadata/source-metadata-types';
import {
	dummySourceEntity,
	dummySourceProperty,
	dummySourceRelationship,
	dummySourceRelationshipMember
} from '../../common/source-metadata-instances';

export type PartialEntityTableDescriptor = Partial<Omit<TableDescriptor, 'name' | 'sourceMetadata'> & {
	sourceEntity: EntityDescriptor;
}>;

export function createEntityTable(name: string, options?: PartialEntityTableDescriptor): TableDescriptor {
	return {
		name,
		identityColumnName: options?.identityColumnName ?? 'id',
		columns: options?.columns ?? [],
		references: options?.references ?? [],
		sourceMetadata: {
			sourceType: SourceType.ENTITY,
			entity: options?.sourceEntity ?? dummySourceEntity
		}
	};
}

export type PartialRelationshipTableDescriptor = Partial<Omit<TableDescriptor, 'name' | 'sourceMetadata'> & {
	sourceRelationship: RelationshipDescriptor;
}>;

export function createRelationshipTable(name: string, options?: PartialRelationshipTableDescriptor): TableDescriptor {
	return {
		name,
		identityColumnName: options?.identityColumnName ?? 'id',
		columns: options?.columns ?? [],
		references: options?.references ?? [],
		sourceMetadata: {
			sourceType: SourceType.RELATIONSHIP,
			relationship: options?.sourceRelationship ?? dummySourceRelationship
		}
	};
}

export type PartialTableColumnDescriptor = Partial<Omit<TableColumnDescriptor, 'name' | 'type' | 'sourceMetadata'> & {
	sourceEntity: EntityDescriptor;
	sourceProperty: EntityPropertyDescriptor;
}>;

export function createTableColumn(name: string, type: EntityPropertyType, options?: PartialTableColumnDescriptor): TableColumnDescriptor {
	return {
		name,
		notNull: options?.notNull ?? true,
		unique: options?.unique ?? false,
		type,
		length: options?.length ?? [],
		sourceMetadata: {
			sourceType: SourceType.ENTITY_PROPERTY,
			entity: options?.sourceEntity ?? dummySourceEntity,
			property: options?.sourceProperty ?? dummySourceProperty
		}
	};
}

export type PartialTableReferenceDescriptor = Partial<Omit<TableReferenceDescriptor, 'columnName' | 'targetTableName' | 'sourceMetadata'> & {
	sourceRelationship: RelationshipDescriptor;
	sourceTargetMember: RelationshipMember;
}>;

export function createTableReference(columnName: string, targetTableName: string, options?: PartialTableReferenceDescriptor): TableReferenceDescriptor {
	return {
		columnName,
		targetTableName,
		targetTableIdentityColumnName: options?.targetTableIdentityColumnName ?? 'id',
		notNull: options?.notNull ?? true,
		unique: options?.unique ?? false,
		sourceMetadata: {
			sourceType: SourceType.RELATIONSHIP_MEMBER,
			relationship: options?.sourceRelationship ?? dummySourceRelationship,
			referencedMember: options?.sourceTargetMember ?? dummySourceRelationshipMember
		}
	};
}
