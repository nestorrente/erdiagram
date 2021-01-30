import pluralize from 'pluralize';
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
				.map(entity => generateEntityTable(entity, model, this.config))
				.forEach(sentence => tables.push(sentence));

		model.relationships
				.filter(isManyToManyRelationship)
				.map(relationship => generateRelationshipTable(relationship, this.config))
				.forEach(sentence => tables.push(sentence));

		return {
			tables
		};

	}

}

// FIXME buscar la forma de poder pasarle las opciones de configuración
const databaseModelGenerator = new DatabaseModelGenerator({
	// pluralizeTableNames: true
});
export default databaseModelGenerator;

function generateEntityTable(entity: EntityDescriptor, model: EntityRelationshipModel, config: DatabaseModelGeneratorConfig): TableDescriptor {

	const name = pluralizeEntityNameIfApplies(capitalizeWord(entity.name), config);

	const columns: TableColumnDescriptor[] = [];

	const references: TableReferenceDescriptor[] = [];

	for (const property of entity.properties) {
		columns.push(mapPropertyToColumn(property));
	}

	for (const relationship of model.relationships) {
		if (relationship.rightMember.cardinality === Cardinality.ONE) {
			if (relationship.leftMember.entity === entity.name) {
				references.push(createTableReference(relationship.rightMember, config));
			}
		} else if (relationship.leftMember.cardinality === Cardinality.ONE) {
			if (relationship.rightMember.entity === entity.name) {
				references.push(createTableReference(relationship.leftMember, config));
			}
		}
	}

	return {
		name,
		columns,
		references
	};

}

function generateRelationshipTable(relationship: RelationshipDescriptor, config: DatabaseModelGeneratorConfig): TableDescriptor {

	const name = getRelationshipTableName(relationship, config);

	return {
		name,
		columns: [],
		references: [
			createTableReference(relationship.leftMember, config),
			createTableReference(relationship.rightMember, config)
		]
	};

}

function getRelationshipTableName(relationship: RelationshipDescriptor, config: DatabaseModelGeneratorConfig): string {

	const {
		relationShipName,
		leftMember,
		rightMember
	} = relationship;

	if (relationShipName) {
		return capitalizeWord(relationShipName);
	}

	return pluralizeEntityNameIfApplies(capitalizeWord(leftMember.entity), config)
			+ pluralizeEntityNameIfApplies(capitalizeWord(rightMember.entity), config);

}

function createTableReference(toMember: RelationshipMember, config: DatabaseModelGeneratorConfig): TableReferenceDescriptor {

	const {
		entityAlias,
		entity,
		optional,
		unique
	} = toMember;

	return {
		columnName: `${entityAlias}Id`,
		targetTableName: pluralizeEntityNameIfApplies(entity, config),
		notNull: !optional,
		unique
	};

}

function pluralizeEntityNameIfApplies(entityName: string, config: DatabaseModelGeneratorConfig): string {
	if (config.pluralizeTableNames) {
		return pluralize(entityName);
	} else {
		return entityName;
	}
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
