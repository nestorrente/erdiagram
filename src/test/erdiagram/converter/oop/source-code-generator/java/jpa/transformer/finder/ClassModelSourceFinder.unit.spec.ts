import ClassModelSourceFinder
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/ClassModelSourceFinder';
import {ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import {createClass, createEntityClassField} from '#/erdiagram/converter/oop/model/class-model-mothers';
import {Cardinality, Direction, RelationshipDescriptor} from '@/erdiagram/parser/types/entity-relationship-model-types';

const classModelSourceFinder = new ClassModelSourceFinder();

describe('Find class and field from referenced member', () => {

	test('Find an existing field', () => {

		const orderToProductsRelationship: RelationshipDescriptor = {
			direction: Direction.LEFT_TO_RIGHT,
			leftMember: {
				entity: 'Order',
				cardinality: Cardinality.ONE,
				entityAlias: 'order'
			},
			rightMember: {
				entity: 'Product',
				cardinality: Cardinality.MANY,
				entityAlias: 'product'
			}
		};

		const orderClass = createClass('Order', {
			fields: [
				createEntityClassField('products', 'Product', {
					list: true,
					sourceRelationship: orderToProductsRelationship,
					sourceTargetMember: orderToProductsRelationship.rightMember
				})
			]
		});

		const classModel: ClassModel = {
			classes: [
				orderClass
			]
		};

		const {
			classDescriptor,
			field
		} = classModelSourceFinder.findClassAndFieldFromReferencedMember(classModel, orderToProductsRelationship.rightMember);

		expect(classDescriptor).toBe(orderClass);
		expect(field).toBe(orderClass.fields[0]);

	});

	test('Find a missing field', () => {

		const orderToProductsRelationship: RelationshipDescriptor = {
			direction: Direction.LEFT_TO_RIGHT,
			leftMember: {
				entity: 'Order',
				cardinality: Cardinality.ONE,
				entityAlias: 'order'
			},
			rightMember: {
				entity: 'Product',
				cardinality: Cardinality.MANY,
				entityAlias: 'product'
			}
		};

		const orderClass = createClass('Order', {
			fields: [
				createEntityClassField('products', 'Product', {
					list: true
				})
			]
		});

		const classModel: ClassModel = {
			classes: [
				orderClass
			]
		};

		expect(() => {
			classModelSourceFinder.findClassAndFieldFromReferencedMember(classModel, orderToProductsRelationship.rightMember);
		}).toThrowError();

	});

});
