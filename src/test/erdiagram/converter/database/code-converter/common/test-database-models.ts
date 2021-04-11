import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {
	createSimpleTableColumn,
	createTableReference
} from '#/erdiagram/converter/database/model/database-model-test-utils';
import {DatabaseModel} from '@/erdiagram/converter/database/model/database-model-types';

export const databaseModelWithTableWithoutColumnsNorReferences: DatabaseModel = {
	tables: [
		{
			name: 'TestTable',
			identityColumnName: 'id',
			columns: [],
			references: []
		},
	]
};

export const databaseModelWithTableWithColumnsOfAllTypes: DatabaseModel = {
	tables: [
		{
			name: 'TestTable',
			identityColumnName: 'id',
			columns: [
				createSimpleTableColumn('booleanColumn', EntityPropertyType.BOOLEAN),
				createSimpleTableColumn('shortColumn', EntityPropertyType.SHORT),
				createSimpleTableColumn('intColumn', EntityPropertyType.INT),
				createSimpleTableColumn('longColumn', EntityPropertyType.LONG),
				createSimpleTableColumn('decimalColumn', EntityPropertyType.DECIMAL, [10, 3]),
				createSimpleTableColumn('textColumn', EntityPropertyType.TEXT, [50]),
				createSimpleTableColumn('dateColumn', EntityPropertyType.DATE),
				createSimpleTableColumn('timeColumn', EntityPropertyType.TIME),
				createSimpleTableColumn('datetimeColumn', EntityPropertyType.DATETIME),
				createSimpleTableColumn('blobColumn', EntityPropertyType.BLOB)
			],
			references: []
		},
	]
};

export const databaseModelWithTableWithCustomId: DatabaseModel = {
	tables: [
		{
			name: 'TestTable',
			identityColumnName: 'theCustomIdentityOfTestTable',
			columns: [],
			references: []
		},
	]
};

export const databaseModelWithTablesWithColumnsWithModifiers: DatabaseModel = {
	tables: [
		{
			name: 'TestTable',
			identityColumnName: 'id',
			columns: [
				{
					name: 'notNullColumn',
					type: EntityPropertyType.INT,
					length: [],
					notNull: true,
					unique: false
				},
				{
					name: 'uniqueColumn',
					type: EntityPropertyType.INT,
					length: [],
					notNull: false,
					unique: true
				},
			],
			references: []
		},
	]
};

export const databaseModelWithTableWithReferenceToAnotherTable: DatabaseModel = {
	tables: [
		{
			name: 'TestTable1',
			identityColumnName: 'id',
			columns: [],
			references: [
				createTableReference('table2Id', 'TestTable2', {
					targetTableIdentityColumnName: 'id'
				})
			]
		},
		{
			name: 'TestTable2',
			identityColumnName: 'id',
			columns: [],
			references: []
		},
	]
};

export const databaseModelWithTableWithUniqueReferenceToAnotherTable: DatabaseModel = {
	tables: [
		{
			name: 'TestTable1',
			identityColumnName: 'id',
			columns: [],
			references: [
				createTableReference('table2Id', 'TestTable2', {
					unique: true
				})
			]
		},
		{
			name: 'TestTable2',
			identityColumnName: 'id',
			columns: [],
			references: []
		},
	]
};

export const databaseModelWithTableWithNullableReferenceToAnotherTable: DatabaseModel = {
	tables: [
		{
			name: 'TestTable1',
			identityColumnName: 'id',
			columns: [],
			references: [
				createTableReference('table2Id', 'TestTable2', {
					notNull: false
				})
			]
		},
		{
			name: 'TestTable2',
			identityColumnName: 'id',
			columns: [],
			references: []
		},
	]
};

export const databaseModelWithTableWithReferenceToAnotherTableWithCustomId: DatabaseModel = {
	tables: [
		{
			name: 'TestTable1',
			identityColumnName: 'id',
			columns: [],
			references: [
				createTableReference('table2Id', 'TestTable2', {
					targetTableIdentityColumnName: 'customId'
				})
			]
		},
		{
			name: 'TestTable2',
			identityColumnName: 'customId',
			columns: [],
			references: []
		},
	]
};

export const databaseModelWithTablesReferencingEachOther: DatabaseModel = {
	tables: [
		{
			name: 'TestTable1',
			identityColumnName: 'id',
			columns: [],
			references: [
				createTableReference('table2Id', 'TestTable2', {
					targetTableIdentityColumnName: 'id'
				})
			]
		},
		{
			name: 'TestTable2',
			identityColumnName: 'id',
			columns: [],
			references: [
				createTableReference('table1Id', 'TestTable1', {
					targetTableIdentityColumnName: 'id'
				})
			]
		},
	]
};

export const databaseModelWithTableReferencingItself: DatabaseModel = {
	tables: [
		{
			name: 'TestTable',
			identityColumnName: 'id',
			columns: [],
			references: [
				createTableReference('selfReferenceId', 'TestTable', {
					targetTableIdentityColumnName: 'id'
				})
			]
		},
	]
};

export const fullDatabaseModel: DatabaseModel = {
	tables: [
		{
			name: 'ModifiersTable',
			identityColumnName: 'theIdOfModifiersTable',
			columns: [
				{
					name: 'notNullColumn',
					type: EntityPropertyType.INT,
					length: [],
					notNull: true,
					unique: false
				},
				{
					name: 'uniqueColumn',
					type: EntityPropertyType.INT,
					length: [],
					notNull: false,
					unique: true
				},
			],
			references: []
		},
		{
			name: 'TypesTable',
			identityColumnName: 'theIdOfTypesTable',
			columns: [
				createSimpleTableColumn('booleanColumn', EntityPropertyType.BOOLEAN),
				createSimpleTableColumn('shortColumn', EntityPropertyType.SHORT),
				createSimpleTableColumn('intColumn', EntityPropertyType.INT),
				createSimpleTableColumn('longColumn', EntityPropertyType.LONG),
				createSimpleTableColumn('decimalColumn', EntityPropertyType.DECIMAL, [10, 3]),
				createSimpleTableColumn('textColumn', EntityPropertyType.TEXT, [50]),
				createSimpleTableColumn('dateColumn', EntityPropertyType.DATE),
				createSimpleTableColumn('timeColumn', EntityPropertyType.TIME),
				createSimpleTableColumn('datetimeColumn', EntityPropertyType.DATETIME),
				createSimpleTableColumn('blobColumn', EntityPropertyType.BLOB)
			],
			references: []
		},
		{
			name: 'ReferencesTable',
			identityColumnName: 'theIdOfReferencesTable',
			columns: [],
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
		},
	]
};
