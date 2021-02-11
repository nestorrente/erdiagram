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

export default class DatabaseModelGenerator {

	private readonly config: DatabaseModelGeneratorConfig;

	constructor(config?: Partial<DatabaseModelGeneratorConfig>) {
		this.config = databaseModelGeneratorConfigManager.mergeWithDefaultConfig(config);
	}

	generateDatabaseModel(model: EntityRelationshipModel): DatabaseModel {

		const tables: TableDescriptor[] = [];

		model.entities
				.map(entity => this.generateEntityTable(entity, model))
				.forEach(sentence => tables.push(sentence));

		model.relationships
				.filter(relationship => this.isManyToManyRelationship(relationship))
				.map(relationship => this.generateRelationshipTable(relationship))
				.forEach(sentence => tables.push(sentence));

		return {
			tables
		};

	}

	private generateEntityTable(entity: EntityDescriptor, model: EntityRelationshipModel): TableDescriptor {

		const name = this.pluralizeEntityNameIfApplies(entity.name);
		const identifierColumnName = this.getIdentifierColumnName(entity.name);

		const columns: TableColumnDescriptor[] = [];

		const references: TableReferenceDescriptor[] = [];

		for (const property of entity.properties) {
			columns.push(this.mapPropertyToColumn(property));
		}

		for (const relationship of model.relationships) {
			if (relationship.rightMember.cardinality === Cardinality.ONE) {
				if (relationship.leftMember.entity === entity.name) {
					references.push(this.createTableReference(relationship.rightMember));
				}
			} else if (relationship.leftMember.cardinality === Cardinality.ONE) {
				if (relationship.rightMember.entity === entity.name) {
					references.push(this.createTableReference(relationship.leftMember));
				}
			}
		}

		return {
			name,
			identifierColumnName,
			columns,
			references
		};

	}

	private generateRelationshipTable(relationship: RelationshipDescriptor): TableDescriptor {

		const name = this.getRelationshipTableName(relationship);
		const identifierColumnName = this.getRelationshipTableIdentifierColumnName(relationship);

		return {
			name,
			identifierColumnName,
			columns: [],
			// We force references to be non-optional in this case, as "one or many" and "zero, one or many" cardinalities
			// are modelled in the same way in SQL - foreign columns of relationship tables are never nullable.
			references: [
				this.createTableReference({
					...relationship.leftMember,
					optional: false
				}),
				this.createTableReference({
					...relationship.rightMember,
					optional: false
				})
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

	private getRelationshipTableIdentifierColumnName(relationship: RelationshipDescriptor): string {

		const {
			relationShipName,
			leftMember,
			rightMember
		} = relationship;

		if (relationShipName) {
			return this.getIdentifierColumnName(relationShipName);
		}

		return this.getIdentifierColumnName(leftMember.entity + rightMember.entity);

	}

	private createTableReference(toMember: RelationshipMember): TableReferenceDescriptor {

		const {
			entityAlias,
			entity,
			optional,
			unique
		} = toMember;

		return {
			columnName: `${entityAlias}Id`,
			targetTableName: this.pluralizeEntityNameIfApplies(entity),
			targetTableIdentifierColumnName: this.getIdentifierColumnName(entity),
			notNull: !optional,
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

	private getIdentifierColumnName(entityName: string) {
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
