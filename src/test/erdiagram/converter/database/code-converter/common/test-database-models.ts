import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {
	createEntityTable,
	createRelationshipTable,
	createTableColumn,
	createTableReference
} from '../../model/database-model-mothers';
import {DatabaseModel} from '@/erdiagram/converter/database/model/database-model-types';

export const databaseModelWithTableWithoutColumnsNorReferences: DatabaseModel = {
	tables: [
		createEntityTable('TestTable')
	]
};

export const databaseModelWithTableWithColumnsOfAllTypes: DatabaseModel = {
	tables: [
		createEntityTable('TestTable', {
			columns: [
				createTableColumn('booleanColumn', EntityPropertyType.BOOLEAN),
				createTableColumn('shortColumn', EntityPropertyType.SHORT),
				createTableColumn('intColumn', EntityPropertyType.INT),
				createTableColumn('longColumn', EntityPropertyType.LONG),
				createTableColumn('decimalColumn', EntityPropertyType.DECIMAL, {length: [10, 3]}),
				createTableColumn('textColumn', EntityPropertyType.TEXT, {length: [50]}),
				createTableColumn('dateColumn', EntityPropertyType.DATE),
				createTableColumn('timeColumn', EntityPropertyType.TIME),
				createTableColumn('datetimeColumn', EntityPropertyType.DATETIME),
				createTableColumn('blobColumn', EntityPropertyType.BLOB)
			]
		})
	]
};

export const databaseModelWithTableWithCustomId: DatabaseModel = {
	tables: [
		createEntityTable('TestTable', {
			identityColumnName: 'theCustomIdentityOfTestTable'
		})
	]
};

export const databaseModelWithTablesWithColumnsWithModifiers: DatabaseModel = {
	tables: [
		createEntityTable('TestTable', {
			columns: [
				createTableColumn('nullableColumn', EntityPropertyType.INT, {notNull: false}),
				createTableColumn('uniqueColumn', EntityPropertyType.INT, {unique: true})
			]
		}),
	]
};

export const databaseModelWithTableWithReferenceToAnotherTable: DatabaseModel = {
	tables: [
		createEntityTable('TestTable1', {
			references: [
				createTableReference('table2Id', 'TestTable2')
			]
		}),
		createEntityTable('TestTable2')
	]
};

export const databaseModelWithTableWithUniqueReferenceToAnotherTable: DatabaseModel = {
	tables: [
		createEntityTable('TestTable1', {
			references: [
				createTableReference('table2Id', 'TestTable2', {
					unique: true
				})
			]
		}),
		createEntityTable('TestTable2')
	]
};

export const databaseModelWithTableWithNullableReferenceToAnotherTable: DatabaseModel = {
	tables: [
		createEntityTable('TestTable1', {
			references: [
				createTableReference('table2Id', 'TestTable2', {
					notNull: false
				})
			]
		}),
		createEntityTable('TestTable2')
	]
};

export const databaseModelWithTableWithReferenceToAnotherTableWithCustomId: DatabaseModel = {
	tables: [
		createEntityTable('TestTable1', {
			references: [
				createTableReference('table2Id', 'TestTable2', {
					targetTableIdentityColumnName: 'customId'
				})
			]
		}),
		createEntityTable('TestTable2', {
			identityColumnName: 'customId'
		})
	]
};

export const databaseModelWithTablesReferencingEachOther: DatabaseModel = {
	tables: [
		createEntityTable('TestTable1', {
			references: [
				createTableReference('table2Id', 'TestTable2')
			]
		}),
		createEntityTable('TestTable2', {
			references: [
				createTableReference('table1Id', 'TestTable1')
			]
		})
	]
};

export const databaseModelWithTableReferencingItself: DatabaseModel = {
	tables: [
		createEntityTable('TestTable', {
			references: [
				createTableReference('selfReferenceId', 'TestTable')
			]
		})
	]
};

export const fullDatabaseModel: DatabaseModel = {
	tables: [
		createEntityTable('ModifiersTable', {
			identityColumnName: 'theIdOfModifiersTable',
			columns: [
				createTableColumn('nullableColumn', EntityPropertyType.INT, {notNull: false}),
				createTableColumn('uniqueColumn', EntityPropertyType.INT, {unique: true})
			]
		}),
		createEntityTable('TypesTable', {
			identityColumnName: 'theIdOfTypesTable',
			columns: [
				createTableColumn('booleanColumn', EntityPropertyType.BOOLEAN),
				createTableColumn('shortColumn', EntityPropertyType.SHORT),
				createTableColumn('intColumn', EntityPropertyType.INT),
				createTableColumn('longColumn', EntityPropertyType.LONG),
				createTableColumn('decimalColumn', EntityPropertyType.DECIMAL, {length: [10, 3]}),
				createTableColumn('textColumn', EntityPropertyType.TEXT, {length: [50]}),
				createTableColumn('dateColumn', EntityPropertyType.DATE),
				createTableColumn('timeColumn', EntityPropertyType.TIME),
				createTableColumn('datetimeColumn', EntityPropertyType.DATETIME),
				createTableColumn('blobColumn', EntityPropertyType.BLOB)
			]
		}),
		createRelationshipTable('ReferencesTable', {
			identityColumnName: 'theIdOfReferencesTable',
			references: [
				createTableReference('modifiersId', 'ModifiersTable', {
					targetTableIdentityColumnName: 'theIdOfModifiersTable'
				}),
				createTableReference('typesId', 'TypesTable', {
					targetTableIdentityColumnName: 'theIdOfTypesTable',
					notNull: false
				}),
				createTableReference('referencesId', 'ReferencesTable', {
					targetTableIdentityColumnName: 'theIdOfReferencesTable',
					unique: true
				})
			]
		}),
	]
};
