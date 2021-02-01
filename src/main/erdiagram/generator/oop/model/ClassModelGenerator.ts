import pluralize from 'pluralize';
import {EntityRelationshipModel} from '@/erdiagram/parser/EntityRelationshipModelParser';
import {
	Cardinality,
	Direction,
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityPropertyType,
	RelationshipMember
} from '@/erdiagram/parser/statement/statement-types-parse-functions';
import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {ClassDescriptor, ClassModel, NonEntityFieldDescriptor} from '@/erdiagram/generator/oop/model/class-model-types';

export interface ClassModelGenerator {
	generateClassModel(model: EntityRelationshipModel): ClassModel;
}

const classModelGenerator: ClassModelGenerator = {

	generateClassModel(model: EntityRelationshipModel): ClassModel {

		const classes: ClassDescriptor[] = [];

		model.entities
				.map(entity => generateEntityTable(entity, model))
				.forEach(sentence => classes.push(sentence));

		return {
			classes
		};

	}

};

export default classModelGenerator;

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
		nullable: toMember.optional,
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
