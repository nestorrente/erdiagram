import {
	Cardinality,
	Direction,
	EntityDescriptor,
	EntityPropertyType,
	RelationshipDescriptor
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import DatabaseModelSourceFinder
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/DatabaseModelSourceFinder';
import {DatabaseModel} from '@/erdiagram/converter/database/model/database-model-types';
import {
	createEntityTable,
	createTableColumn,
	createTableReference
} from '#/erdiagram/converter/database/model/database-model-mothers';
import {createEntityProperty} from '#/erdiagram/parser/entity-relationship-model-mothers';

const databaseModelSourceFinder = new DatabaseModelSourceFinder();

describe('Find table and reference from referenced member', () => {

	test('Find an existing reference', () => {

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

		const productTable = createEntityTable('Product', {
			references: [
				createTableReference('orderId', 'Order', {
					sourceRelationship: orderToProductsRelationship,
					sourceTargetMember: orderToProductsRelationship.leftMember
				})
			]
		});
		const databaseModel: DatabaseModel = {
			tables: [
				createEntityTable('Order'),
				productTable
			]
		};

		const {
			table,
			reference
		} = databaseModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, orderToProductsRelationship.leftMember);

		expect(table).toBe(productTable);
		expect(reference).toBe(productTable.references[0]);

	});

	test('Find a missing reference', () => {

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

		const databaseModel: DatabaseModel = {
			tables: [
				createEntityTable('Order'),
				createEntityTable('Product', {
					references: [
						createTableReference('orderId', 'Order')
					]
				})
			]
		};

		expect(() => {
			databaseModelSourceFinder.findTableAndReferenceFromReferencedMember(databaseModel, orderToProductsRelationship.leftMember);
		}).toThrowError();

	});

});

describe('Find table from entity', () => {

	test('Find an existing table', () => {

		const userEntity: EntityDescriptor = {
			name: 'User',
			properties: []
		};

		const userTable = createEntityTable('User', {
			sourceEntity: userEntity
		});

		const databaseModel: DatabaseModel = {
			tables: [
				userTable
			]
		};

		const table = databaseModelSourceFinder.findTableFromEntity(databaseModel, userEntity);

		expect(table).toBe(userTable);

	});

	test('Find a missing table', () => {

		const userEntity: EntityDescriptor = {
			name: 'User',
			properties: []
		};

		const databaseModel: DatabaseModel = {
			tables: [
				createEntityTable('User')
			]
		};

		expect(() => {
			databaseModelSourceFinder.findTableFromEntity(databaseModel, userEntity);
		}).toThrowError();

	});

});

describe('Find column from property', () => {

	test('Find an existing column', () => {

		const userIdProperty = createEntityProperty('id', EntityPropertyType.IDENTITY);

		const userEntity: EntityDescriptor = {
			name: 'User',
			properties: [
				userIdProperty
			]
		};

		const userTable = createEntityTable('User', {
			columns: [
				createTableColumn('id', EntityPropertyType.IDENTITY, {
					sourceEntity: userEntity,
					sourceProperty: userIdProperty
				})
			]
		});

		const databaseModel: DatabaseModel = {
			tables: [
				userTable
			]
		};

		const column = databaseModelSourceFinder.findColumnFromProperty(databaseModel, userIdProperty);

		expect(column).toBe(userTable.columns[0]);

	});

	test('Find a missing column', () => {

		const userIdProperty = createEntityProperty('id', EntityPropertyType.IDENTITY);

		const userTable = createEntityTable('User', {
			columns: [
				createTableColumn('id', EntityPropertyType.IDENTITY)
			]
		});

		const databaseModel: DatabaseModel = {
			tables: [
				userTable
			]
		};

		expect(() => {
			databaseModelSourceFinder.findColumnFromProperty(databaseModel, userIdProperty);
		}).toThrowError();

	});

});
