import pluralize from 'pluralize';
import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {ClassDescriptor, ClassModel, NonEntityFieldDescriptor} from '@/erdiagram/generator/oop/model/class-model-types';
import {
	Cardinality,
	Direction,
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityPropertyType,
	EntityRelationshipModel,
	RelationshipMember
} from '@/erdiagram/parser/entity-relationship-model-types';

export default class ClassModelGenerator {

	generateClassModel(model: EntityRelationshipModel): ClassModel {

		const classes: ClassDescriptor[] = [];

		model.entities
				.map(entity => generateEntityTable(entity, model))
				.forEach(sentence => classes.push(sentence));

		console.log('Test');
		return {
			classes
		};

	}

};

function generateEntityTable(entity: EntityDescriptor, model: EntityRelationshipModel): ClassDescriptor {

	const name = capitalizeWord(entity.name);

	const fields: NonEntityFieldDescriptor[] = [
		createIdField()
	];

	for (const property of entity.properties) {
		fields.push(mapPropertyToField(property));
	}

	for (const relationship of model.relationships) {

		const {
			leftMember,
			rightMember,
			direction
		} = relationship;

		if (leftMember.entity === entity.name && [Direction.RIGHT, Direction.BOTH].includes(direction)) {
			fields.push(mapRelationshipMemberToField(rightMember));
		}

		if (rightMember.entity === entity.name && [Direction.LEFT, Direction.BOTH].includes(direction)) {
			fields.push(mapRelationshipMemberToField(leftMember));
		}

	}

	return {
		name,
		fields
	};

}

function createIdField(): NonEntityFieldDescriptor {
	return {
		name: 'id',
		primitiveType: EntityPropertyType.LONG,
		nullable: false,
		list: false
	};
}

function mapRelationshipMemberToField(toMember: RelationshipMember): NonEntityFieldDescriptor {

	const list = toMember.cardinality === Cardinality.MANY;
	const name = list ? pluralize(toMember.entityAlias) : toMember.entityAlias;

	return {
		name,
		// List fields are never nullable, as both "one or many" and "zero, one or many"
		// relationships are modelled using a list, which may be empty or not.
		nullable: toMember.optional && !list,
		entityType: toMember.entity,
		list
	};

}

function mapPropertyToField(property: EntityPropertyDescriptor): NonEntityFieldDescriptor {

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
