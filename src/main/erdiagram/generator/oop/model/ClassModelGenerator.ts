import pluralize from 'pluralize';
import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {ClassDescriptor, ClassFieldDescriptor, ClassModel} from '@/erdiagram/generator/oop/model/class-model-types';
import {
	Cardinality,
	Direction,
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityPropertyType,
	EntityRelationshipModel,
	RelationshipMember
} from '@/erdiagram/parser/entity-relationship-model-types';
import ClassModelGeneratorConfig from '@/erdiagram/generator/oop/model/config/ClassModelGeneratorConfig';
import classModelGeneratorConfigManager from '@/erdiagram/generator/oop/model/config/ClassModelGeneratorConfigManager';

export default class ClassModelGenerator {

	private readonly config: ClassModelGeneratorConfig;

	constructor(config?: Partial<ClassModelGeneratorConfig>) {
		this.config = classModelGeneratorConfigManager.mergeWithDefaultConfig(config);
	}

	generateClassModel(model: EntityRelationshipModel): ClassModel {

		const classes: ClassDescriptor[] = [];

		model.entities
				.map(entity => this.generateEntityTable(entity, model))
				.forEach(sentence => classes.push(sentence));

		return {
			classes
		};

	}

	private generateEntityTable(entity: EntityDescriptor, model: EntityRelationshipModel): ClassDescriptor {

		const name = capitalizeWord(entity.name);

		const fields: ClassFieldDescriptor[] = [
			this.createIdField(entity)
		];

		for (const property of entity.properties) {
			fields.push(this.mapPropertyToField(property));
		}

		for (const relationship of model.relationships) {

			const {
				leftMember,
				rightMember,
				direction
			} = relationship;

			if (leftMember.entity === entity.name && [Direction.LEFT_TO_RIGHT, Direction.BIDIRECTIONAL].includes(direction)) {
				fields.push(this.mapRelationshipMemberToField(rightMember));
			}

			if (rightMember.entity === entity.name && [Direction.RIGHT_TO_LEFT, Direction.BIDIRECTIONAL].includes(direction)) {
				fields.push(this.mapRelationshipMemberToField(leftMember));
			}

		}

		return {
			name,
			fields
		};

	}

	private createIdField(entity: EntityDescriptor): ClassFieldDescriptor {
		return {
			name: this.getIdentifierFieldName(entity),
			primitiveType: EntityPropertyType.IDENTIFIER,
			// ID field must be nullable, so NULL value can be used to represent an unsaved instance
			nullable: true,
			list: false
		};
	}

	private getIdentifierFieldName(entity: EntityDescriptor) {

		if (entity.identifierPropertyName) {
			return entity.identifierPropertyName;
		}

		const {idNamingStrategy} = this.config;
		return idNamingStrategy(entity.name);

	}

	private mapRelationshipMemberToField(toMember: RelationshipMember): ClassFieldDescriptor {

		const list = toMember.cardinality === Cardinality.MANY;
		const name = list ? pluralize(toMember.entityAlias) : toMember.entityAlias;

		return {
			name,
			nullable: toMember.cardinality === Cardinality.ZERO_OR_ONE,
			entityType: toMember.entity,
			list
		};

	}

	private mapPropertyToField(property: EntityPropertyDescriptor): ClassFieldDescriptor {

		const {
			name,
			optional,
			type
		} = property;

		return {
			name,
			nullable: optional,
			primitiveType: type,
			list: false
		};

	}

};
