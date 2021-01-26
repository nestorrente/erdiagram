import {EntityRelationshipModel} from '../../../parser/er-model-parser';
import {
	Cardinality,
	Direction,
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityPropertyType,
	RelationshipMember
} from '../../../parser/statement/statement-types-parse-functions';
import {capitalize} from '../../../util/string-utils';
import {ClassDescriptor, ClassModel, FieldDescriptor} from './class-model-types';

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

	const name = capitalize(entity.name);

	const fields: FieldDescriptor[] = [
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
		} else if (rightMember.entity === entity.name && [Direction.LEFT, Direction.BOTH].includes(direction)) {
			fields.push(mapRelationshipMemberToField(leftMember));
		}

	}

	return {
		name,
		fields
	};

}

function createIdField(): FieldDescriptor {
	return {
		name: 'id',
		primitiveType: EntityPropertyType.LONG,
		nullable: false,
		list: false
	};
}

function mapRelationshipMemberToField(toMember: RelationshipMember): FieldDescriptor {
	return {
		name: toMember.entityAlias,
		nullable: toMember.optional,
		entityType: toMember.entity,
		list: toMember.cardinality === Cardinality.MANY
	};
}

function mapPropertyToField(property: EntityPropertyDescriptor): FieldDescriptor {

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
