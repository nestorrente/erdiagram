import {
	DatabaseModel,
	TableColumnDescriptor,
	TableDescriptor
} from '@/erdiagram/converter/database/model/database-model-types';
import {isEntitySourceMetadata} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-utils';
import {
	EntityDescriptor,
	EntityPropertyDescriptor,
	RelationshipMember
} from '@/erdiagram/parser/types/entity-relationship-model-types';

// FIXME change this name or refactor this class, as it also retrieves field and class descriptors, not only database ones
export default class EntityRelationshipModelSourceFinder {

	public findTableAndReferenceFromReferencedMember(databaseModel: DatabaseModel, referencedMember: RelationshipMember) {

		for (const table of databaseModel.tables) {
			for (const reference of table.references) {
				if (reference.sourceMetadata.referencedMember === referencedMember) {
					return {
						table,
						reference
					};
				}
			}
		}

		throw new Error(`Cannot find reference from target member "${referencedMember.entityAlias}"`);

	}

	public findTableFromEntity(databaseModel: DatabaseModel, entity: EntityDescriptor): TableDescriptor {

		const foundTable = databaseModel.tables.find(table => this.isCorrespondingTable(entity, table));

		if (foundTable == null) {
			throw new Error(`Cannot find the corresponding table for entity "${entity.name}"`);
		}

		return foundTable;

	}

	private isCorrespondingTable(entity: EntityDescriptor, tableDescriptor: TableDescriptor): boolean {
		return isEntitySourceMetadata(tableDescriptor.sourceMetadata) && tableDescriptor.sourceMetadata.entity === entity;
	}

	public findColumnFromProperty(databaseModel: DatabaseModel, property: EntityPropertyDescriptor): TableColumnDescriptor {

		for (const table of databaseModel.tables) {
			for (const column of table.columns) {
				if (column.sourceMetadata.property === property) {
					return column;
				}
			}
		}

		throw new Error(`Cannot find the corresponding column for property "${property.name}"`);

	}

}
