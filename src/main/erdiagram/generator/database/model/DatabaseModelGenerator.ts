import pluralize from 'pluralize';
import {
	DatabaseModel,
	TableColumnDescriptor,
	TableDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/model/database-model-types';
import DatabaseModelGeneratorConfig from '@/erdiagram/generator/database/model/config/DatabaseModelGeneratorConfig';
import {
	Cardinality,
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityRelationshipModel,
	RelationshipDescriptor,
	RelationshipMember
} from '@/erdiagram/parser/entity-relationship-model-types';
import databaseModelGeneratorConfigManager
	from '@/erdiagram/generator/database/model/config/DatabaseModelGeneratorConfigManager';
import {classifyBy} from '@/erdiagram/util/map-utils';

export default class DatabaseModelGenerator {

	private readonly config: DatabaseModelGeneratorConfig;

	constructor(config?: Partial<DatabaseModelGeneratorConfig>) {
		this.config = databaseModelGeneratorConfigManager.mergeWithDefaultConfig(config);
	}

	generateDatabaseModel(model: EntityRelationshipModel): DatabaseModel {

		const entityIdentifiersMap = classifyBy(
				model.entities.filter(entity => entity.identifierPropertyName),
				entity => entity.name,
				entity => entity.identifierPropertyName!
		);

		const tables: TableDescriptor[] = [];

		this.generateEntityTables(model, entityIdentifiersMap, tables);
		this.generateRelationshipTables(model, entityIdentifiersMap, tables);

		return {
			tables
		};

	}

	private generateEntityTables(model: EntityRelationshipModel, entityIdentifiersMap: Map<string, string>, tables: TableDescriptor[]) {
		model.entities
				.map(entity => this.generateEntityTable(entity, model, entityIdentifiersMap))
				.forEach(sentence => tables.push(sentence));
	}

	private generateEntityTable(entity: EntityDescriptor, model: EntityRelationshipModel, entityIdentifiersMap: Map<string, string>): TableDescriptor {

		const columns: TableColumnDescriptor[] = [];

		const references: TableReferenceDescriptor[] = [];

		for (const property of entity.properties) {
			columns.push(this.mapPropertyToColumn(property));
		}

		for (const relationship of model.relationships) {
			if (relationship.rightMember.cardinality !== Cardinality.MANY) {
				if (relationship.leftMember.entity === entity.name) {
					const isOneToOneRelationship = relationship.leftMember.cardinality !== Cardinality.MANY;
					references.push(this.createTableReference(relationship.rightMember, entityIdentifiersMap, isOneToOneRelationship));
				}
			} else if (relationship.leftMember.cardinality !== Cardinality.MANY) {
				if (relationship.rightMember.entity === entity.name) {
					references.push(this.createTableReference(relationship.leftMember, entityIdentifiersMap));
				}
			}
		}

		return {
			name: this.pluralizeEntityNameIfApplies(entity.name),
			identifierColumnName: this.getIdentifierColumnName(entity.name, entityIdentifiersMap),
			columns,
			references
		};

	}

	private generateRelationshipTables(model: EntityRelationshipModel, entityIdentifiersMap: Map<string, string>, tables: TableDescriptor[]) {
		model.relationships
				.filter(relationship => this.isManyToManyRelationship(relationship))
				.map(relationship => this.generateRelationshipTable(relationship, entityIdentifiersMap))
				.forEach(sentence => tables.push(sentence));
	}

	private generateRelationshipTable(relationship: RelationshipDescriptor, entityIdentifiersMap: Map<string, string>): TableDescriptor {

		const name = this.getRelationshipTableName(relationship);
		const identifierColumnName = this.getRelationshipTableIdentifierColumnName(relationship, entityIdentifiersMap);

		return {
			name,
			identifierColumnName,
			columns: [],
			references: [
				this.createTableReference(relationship.leftMember, entityIdentifiersMap),
				this.createTableReference(relationship.rightMember, entityIdentifiersMap)
			]
		};

	}

	private getRelationshipTableName(relationship: RelationshipDescriptor): string {

		const {
			relationShipName,
			leftMember,
			rightMember
		} = relationship;

		if (relationShipName) {
			return relationShipName;
		}

		return this.pluralizeEntityNameIfApplies(leftMember.entity)
				+ this.pluralizeEntityNameIfApplies(rightMember.entity);

	}

	private getRelationshipTableIdentifierColumnName(relationship: RelationshipDescriptor, entityIdentifiersMap: Map<string, string>): string {

		const {
			relationShipName,
			leftMember,
			rightMember
		} = relationship;

		if (relationShipName) {
			return this.getIdentifierColumnName(relationShipName, entityIdentifiersMap);
		}

		return this.getIdentifierColumnName(leftMember.entity + rightMember.entity, entityIdentifiersMap);

	}

	private createTableReference(toMember: RelationshipMember, entityIdentifiersMap: Map<string, string>, unique: boolean = false): TableReferenceDescriptor {

		const {
			entityAlias,
			entity,
			cardinality
		} = toMember;

		return {
			columnName: `${entityAlias}Id`,
			targetTableName: this.pluralizeEntityNameIfApplies(entity),
			targetTableIdentifierColumnName: this.getIdentifierColumnName(entity, entityIdentifiersMap),
			notNull: cardinality !== Cardinality.ZERO_OR_ONE,
			unique
		};

	}

	private pluralizeEntityNameIfApplies(entityName: string): string {
		if (this.config.usePluralTableNames) {
			return pluralize(entityName);
		} else {
			return entityName;
		}
	}

	private getIdentifierColumnName(entityName: string, entityIdentifiersMap: Map<string, string>): string {

		if (entityIdentifiersMap.has(entityName)) {
			return entityIdentifiersMap.get(entityName)!;
		}

		const {idNamingStrategy} = this.config;
		return idNamingStrategy(entityName);

	}

	private mapPropertyToColumn(property: EntityPropertyDescriptor): TableColumnDescriptor {

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

	private isManyToManyRelationship(relationship: RelationshipDescriptor): boolean {
		return [
			relationship.leftMember,
			relationship.rightMember
		].every(member => member.cardinality === Cardinality.MANY);
	}

}
