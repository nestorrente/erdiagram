import pluralize from 'pluralize';
import {
	DatabaseModel,
	TableColumnDescriptor,
	TableDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/converter/database/model/database-model-types';
import DatabaseModelConfig, {PartialDatabaseModelConfig} from '@/erdiagram/converter/database/model/config/DatabaseModelConfig';
import {
	Cardinality,
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityRelationshipModel,
	RelationshipDescriptor,
	RelationshipMember
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import databaseModelConfigManager from '@/erdiagram/converter/database/model/config/DatabaseModelConfigManager';
import {classifyBy} from '@/erdiagram/util/map-utils';
import {capitalizeWord, uncapitalizeWord} from '@/erdiagram/util/string-utils';
import {SourceType} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-types';

export default class DatabaseModelGenerator {

	private readonly config: DatabaseModelConfig;

	constructor(config?: PartialDatabaseModelConfig) {
		this.config = databaseModelConfigManager.mergeWithDefaultConfig(config);
	}

	generateDatabaseModel(model: EntityRelationshipModel): DatabaseModel {

		const entityIdentitiesMap = classifyBy(
				model.entities.filter(entity => entity.identityPropertyName),
				entity => entity.name,
				entity => entity.identityPropertyName!
		);

		const tables: TableDescriptor[] = [];

		this.generateEntityTables(model, entityIdentitiesMap, tables);
		this.generateRelationshipTables(model, entityIdentitiesMap, tables);

		return {
			tables
		};

	}

	private generateEntityTables(model: EntityRelationshipModel, entityIdentitiesMap: Map<string, string>, tables: TableDescriptor[]) {
		model.entities
				.map(entity => this.generateEntityTable(entity, model, entityIdentitiesMap))
				.forEach(sentence => tables.push(sentence));
	}

	private generateEntityTable(entity: EntityDescriptor, model: EntityRelationshipModel, entityIdentitiesMap: Map<string, string>): TableDescriptor {

		const columns: TableColumnDescriptor[] = [];

		const references: TableReferenceDescriptor[] = [];

		for (const property of entity.properties) {
			columns.push(this.mapPropertyToColumn(entity, property));
		}

		for (const relationship of model.relationships) {
			if (relationship.rightMember.cardinality !== Cardinality.MANY) {
				if (relationship.leftMember.entity === entity.name) {
					const isOneToOneRelationship = relationship.leftMember.cardinality !== Cardinality.MANY;
					references.push(this.createTableReference(relationship, relationship.rightMember, entityIdentitiesMap, isOneToOneRelationship));
				}
			} else if (relationship.leftMember.cardinality !== Cardinality.MANY) {
				if (relationship.rightMember.entity === entity.name) {
					references.push(this.createTableReference(relationship, relationship.leftMember, entityIdentitiesMap));
				}
			}
		}

		return {
			name: this.pluralizeEntityNameIfApplies(entity.name),
			identityColumnName: this.getIdentityColumnName(entity.name, entityIdentitiesMap),
			columns,
			references,
			sourceMetadata: {
				sourceType: SourceType.ENTITY,
				entity
			}
		};

	}

	private generateRelationshipTables(model: EntityRelationshipModel, entityIdentitiesMap: Map<string, string>, tables: TableDescriptor[]) {
		model.relationships
				.filter(relationship => this.isManyToManyRelationship(relationship))
				.map(relationship => this.generateRelationshipTable(relationship, entityIdentitiesMap))
				.forEach(sentence => tables.push(sentence));
	}

	private generateRelationshipTable(relationship: RelationshipDescriptor, entityIdentitiesMap: Map<string, string>): TableDescriptor {

		const name = this.getRelationshipTableName(relationship);
		const identityColumnName = this.getRelationshipTableIdentityColumnName(relationship, entityIdentitiesMap);

		return {
			name,
			identityColumnName: identityColumnName,
			columns: [],
			references: [
				this.createTableReference(relationship, relationship.leftMember, entityIdentitiesMap),
				this.createTableReference(relationship, relationship.rightMember, entityIdentitiesMap)
			],
			sourceMetadata: {
				sourceType: SourceType.RELATIONSHIP,
				relationship
			}
		};

	}

	private getRelationshipTableName(relationship: RelationshipDescriptor): string {

		const {
			relationshipName,
			leftMember,
			rightMember
		} = relationship;

		if (relationshipName) {
			return relationshipName;
		}

		return this.pluralizeEntityNameIfApplies(leftMember.entity)
				+ this.pluralizeEntityNameIfApplies(rightMember.entity);

	}

	private getRelationshipTableIdentityColumnName(relationship: RelationshipDescriptor, entityIdentitiesMap: Map<string, string>): string {

		const {
			relationshipName,
			leftMember,
			rightMember
		} = relationship;

		if (relationshipName) {
			return this.getIdentityColumnName(relationshipName, entityIdentitiesMap);
		}

		return this.getIdentityColumnName(leftMember.entity + rightMember.entity, entityIdentitiesMap);

	}

	private createTableReference(
			relationship: RelationshipDescriptor,
			toMember: RelationshipMember,
			entityIdentitiesMap: Map<string, string>,
			unique: boolean = false
	): TableReferenceDescriptor {

		const {
			entityAlias,
			entity,
			cardinality
		} = toMember;

		return {
			columnName: `${entityAlias}Id`,
			targetTableName: this.pluralizeEntityNameIfApplies(entity),
			targetTableIdentityColumnName: this.getIdentityColumnName(entity, entityIdentitiesMap),
			notNull: cardinality !== Cardinality.ZERO_OR_ONE,
			unique,
			sourceMetadata: {
				sourceType: SourceType.RELATIONSHIP_MEMBER,
				relationship,
				referencedMember: toMember
			}
		};

	}

	private pluralizeEntityNameIfApplies(entityName: string): string {

		if (!this.config.usePluralTableNames) {
			return entityName;
		}

		// pluralize() takes into account the case of the word, so 'A' is pluralized to 'AS' instead of 'As'.
		// This means that we have to uncapitalize the entity name before calling pluralize() in order to get the
		// expected behavior, then capitalize the result.

		const uncapitalizedEntityName = uncapitalizeWord(entityName);
		const pluralizedUncapitalizedEntityName = pluralize(uncapitalizedEntityName);

		return capitalizeWord(pluralizedUncapitalizedEntityName);

	}

	private getIdentityColumnName(entityName: string, entityIdentitiesMap: Map<string, string>): string {

		if (entityIdentitiesMap.has(entityName)) {
			return entityIdentitiesMap.get(entityName)!;
		}

		const {idNamingStrategy} = this.config;
		return idNamingStrategy(entityName);

	}

	private mapPropertyToColumn(entity: EntityDescriptor, property: EntityPropertyDescriptor): TableColumnDescriptor {

		const {
			name,
			optional,
			unique,
			type,
			length
		} = property;

		return {
			name,
			notNull: !optional,
			unique,
			type,
			length,
			sourceMetadata: {
				sourceType: SourceType.ENTITY_PROPERTY,
				entity,
				property
			}
		};

	}

	private isManyToManyRelationship(relationship: RelationshipDescriptor): boolean {
		return [
			relationship.leftMember,
			relationship.rightMember
		].every(member => member.cardinality === Cardinality.MANY);
	}

}
