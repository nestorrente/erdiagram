import {EntityRelationshipModel} from '../../../parser/er-model-parser';
import {
	Cardinality,
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityPropertyType,
	RelationshipDescriptor,
	RelationshipMember
} from '../../../parser/statement/statement-types-parse-functions';
import {capitalize} from '../../../util/string-utils';
import {DatabaseModel, TableColumnDescriptor, TableDescriptor, TableReferenceDescriptor} from './database-model-types';

export interface DatabaseModelGenerator {
	generateDatabaseModel(model: EntityRelationshipModel): DatabaseModel;
}

const databaseModelGenerator: DatabaseModelGenerator = {

	generateDatabaseModel(model: EntityRelationshipModel): DatabaseModel {

		const tables: TableDescriptor[] = [];

		model.entities
				.map(entity => generateEntityTable(entity, model))
				.forEach(sentence => tables.push(sentence));

		model.relationships
				.filter(isManyToManyRelationship)
				.map(relationship => generateRelationshipTable(relationship))
				.forEach(sentence => tables.push(sentence));

		return {
			tables
		};

	}

};

export default databaseModelGenerator;

function generateEntityTable(entity: EntityDescriptor, model: EntityRelationshipModel): TableDescriptor {

	const name = capitalize(entity.name);
	const id = getTableIdColumnName(name);

	const columns: TableColumnDescriptor[] = [];
	const references: TableReferenceDescriptor[] = [];

	for (const property of entity.properties) {
		columns.push(mapPropertyToColumn(property));
	}

	for (const relationship of model.relationships) {
		if (relationship.rightMember.cardinality === Cardinality.ONE) {
			if (relationship.leftMember.entity === entity.name) {
				references.push(createTableReference(relationship.rightMember));
			}
		} else if (relationship.leftMember.cardinality === Cardinality.ONE) {
			if (relationship.rightMember.entity === entity.name) {
				references.push(createTableReference(relationship.leftMember));
			}
		}
	}

	return {
		name,
		id,
		columns,
		references
	};

}

function generateRelationshipTable(relationship: RelationshipDescriptor): TableDescriptor {

	const name = capitalize(relationship.relationShipName);
	const id = getTableIdColumnName(name);

	return {
		name,
		id,
		columns: [],
		references: [
			createTableReference(relationship.leftMember),
			createTableReference(relationship.rightMember)
		]
	};

}

function createTableReference(toMember: RelationshipMember): TableReferenceDescriptor {
	return {
		alias: toMember.entityAlias,
		columnName: `${toMember.entityAlias}Id`,
		targetTableName: toMember.entity,
		notNull: !toMember.optional
	};
}

function mapRelationshipMemberToColumn(toMember: RelationshipMember): TableColumnDescriptor {
	return {
		name: toMember.entityAlias,
		notNull: !toMember.optional,
		type: EntityPropertyType.LONG
	};
}

function getTableIdColumnName(tableName: string) {
	// TODO definir diferentes estrategias
	// return uncapitalize(tableName) + 'Id';
	return 'id';
}

function mapPropertyToColumn(property: EntityPropertyDescriptor): TableColumnDescriptor {

	const {
		name,
		optional,
		type,
		length
	} = property;

	return {
		name,
		notNull: !optional,
		type,
		length
	};

}

function isManyToManyRelationship(relationship: RelationshipDescriptor): boolean {
	return [
		relationship.leftMember,
		relationship.rightMember
	].every(member => member.cardinality === Cardinality.MANY);
}
