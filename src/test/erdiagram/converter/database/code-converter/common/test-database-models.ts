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
			identifierColumnName: 'id',
			columns: [],
			references: []
		},
	]
};

export const databaseModelWithTableWithColumnsOfAllTypes: DatabaseModel = {
	tables: [
		{
			name: 'TestTable',
			identifierColumnName: 'id',
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
			identifierColumnName: 'theCustomIdentifierOfTestTable',
			columns: [],
			references: []
		},
	]
};

export const databaseModelWithTablesWithColumnsWithModifiers: DatabaseModel = {
	tables: [
		{
			name: 'TestTable',
			identifierColumnName: 'id',
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
			identifierColumnName: 'id',
			columns: [],
			references: [
				createTableReference('table2Id', 'TestTable2', {
					targetTableIdentifierColumnName: 'id'
				})
			]
		},
		{
			name: 'TestTable2',
			identifierColumnName: 'id',
			columns: [],
			references: []
		},
	]
};

export const databaseModelWithTableWithUniqueReferenceToAnotherTable: DatabaseModel = {
	tables: [
		{
			name: 'TestTable1',
			identifierColumnName: 'id',
			columns: [],
			references: [
				createTableReference('table2Id', 'TestTable2', {
					unique: true
				})
			]
		},
		{
			name: 'TestTable2',
			identifierColumnName: 'id',
			columns: [],
			references: []
		},
	]
};

export const databaseModelWithTableWithNullableReferenceToAnotherTable: DatabaseModel = {
	tables: [
		{
			name: 'TestTable1',
			identifierColumnName: 'id',
			columns: [],
			references: [
				createTableReference('table2Id', 'TestTable2', {
					notNull: false
				})
			]
		},
		{
			name: 'TestTable2',
			identifierColumnName: 'id',
			columns: [],
			references: []
		},
	]
};

export const databaseModelWithTableWithReferenceToAnotherTableWithCustomId: DatabaseModel = {
	tables: [
		{
			name: 'TestTable1',
			identifierColumnName: 'id',
			columns: [],
			references: [
				createTableReference('table2Id', 'TestTable2', {
					targetTableIdentifierColumnName: 'customId'
				})
			]
		},
		{
			name: 'TestTable2',
			identifierColumnName: 'customId',
			columns: [],
			references: []
		},
	]
};

export const databaseModelWithTablesReferencingEachOther: DatabaseModel = {
	tables: [
		{
			name: 'TestTable1',
			identifierColumnName: 'id',
			columns: [],
			references: [
				createTableReference('table2Id', 'TestTable2', {
					targetTableIdentifierColumnName: 'id'
				})
			]
		},
		{
			name: 'TestTable2',
			identifierColumnName: 'id',
			columns: [],
			references: [
				createTableReference('table1Id', 'TestTable1', {
					targetTableIdentifierColumnName: 'id'
				})
			]
		},
	]
};

export const databaseModelWithTableReferencingItself: DatabaseModel = {
	tables: [
		{
			name: 'TestTable',
			identifierColumnName: 'id',
			columns: [],
			references: [
				createTableReference('selfReferenceId', 'TestTable', {
					targetTableIdentifierColumnName: 'id'
				})
			]
		},
	]
};

export const fullDatabaseModel: DatabaseModel = {
	tables: [
		{
			name: 'ModifiersTable',
			identifierColumnName: 'theIdOfModifiersTable',
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
			identifierColumnName: 'theIdOfTypesTable',
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
			identifierColumnName: 'theIdOfReferencesTable',
			columns: [],
			references: [
				createTableReference('modifiersId', 'ModifiersTable', {
					targetTableIdentifierColumnName: 'theIdOfModifiersTable'
				}),
				createTableReference('typesId', 'TypesTable', {
					targetTableIdentifierColumnName: 'theIdOfTypesTable',
					notNull: false
				}),
				createTableReference('referencesId', 'ReferencesTable', {
					targetTableIdentifierColumnName: 'theIdOfReferencesTable',
					unique: true
				})
			]
		},
	]
};
