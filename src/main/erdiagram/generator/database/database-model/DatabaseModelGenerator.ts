import {EntityRelationshipModel} from '@/erdiagram/parser/er-model-parser';
import {
	Cardinality,
	EntityDescriptor,
	EntityPropertyDescriptor,
	RelationshipDescriptor,
	RelationshipMember
} from '@/erdiagram/parser/statement/statement-types-parse-functions';
import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {
	DatabaseModel,
	TableColumnDescriptor,
	TableDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/database-model/database-model-types';
import DatabaseModelGeneratorConfig, {mergeWithDefaultConfig} from '@/erdiagram/generator/database/database-model/DatabaseModelGeneratorConfig';

export class DatabaseModelGenerator {

	private readonly config: DatabaseModelGeneratorConfig;

	constructor(config?: Partial<DatabaseModelGeneratorConfig>) {
		this.config = mergeWithDefaultConfig(config);
	}

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

}

const databaseModelGenerator = new DatabaseModelGenerator();
export default databaseModelGenerator;

function generateEntityTable(entity: EntityDescriptor, model: EntityRelationshipModel): TableDescriptor {

	const name = capitalizeWord(entity.name);

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
		columns,
		references
	};

}

function generateRelationshipTable(relationship: RelationshipDescriptor): TableDescriptor {

	const name = capitalizeWord(relationship.relationShipName);

	return {
		name,
		columns: [],
		references: [
			createTableReference(relationship.leftMember),
			createTableReference(relationship.rightMember)
		]
	};

}

function createTableReference(toMember: RelationshipMember): TableReferenceDescriptor {

	const {
		entityAlias,
		entity,
		optional,
		unique
	} = toMember;

	return {
		columnName: `${entityAlias}Id`,
		targetTableName: entity,
		notNull: !optional,
		unique
	};

}

function mapPropertyToColumn(property: EntityPropertyDescriptor): TableColumnDescriptor {

	const {
		name,
		optional,
		autoincremental,
		unique,
		type,
		length
	} = property;

	return {
		name,
		notNull: !optional,
		autoincremental,
		unique,
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
