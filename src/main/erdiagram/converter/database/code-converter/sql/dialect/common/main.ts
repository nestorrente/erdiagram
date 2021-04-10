import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/converter/database/model/database-model-types';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import MysqlScriptBuilder from '@/erdiagram/converter/database/code-converter/sql/dialect/mysql/MysqlScriptBuilder';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';

const sqlScriptBuilder = new MysqlScriptBuilder({
	tableNameCaseFormat: StandardCaseFormats.UPPER_CAMEL,
	columnNameCaseFormat: StandardCaseFormats.LOWER_CAMEL,
	typeBindings: {
		[EntityPropertyType.IDENTIFIER]: 'BIGINT',
		[EntityPropertyType.TEXT]: 'VARCHAR',
		[EntityPropertyType.LONG]: 'BIGINT',
		[EntityPropertyType.INT]: 'INT',
		[EntityPropertyType.SHORT]: 'SHORT',
		[EntityPropertyType.DECIMAL]: 'DECIMAL',
		[EntityPropertyType.BOOLEAN]: 'BOOLEAN',
		[EntityPropertyType.DATE]: 'DATE',
		[EntityPropertyType.TIME]: 'TIME',
		[EntityPropertyType.DATETIME]: 'TIMESTAMP',
		[EntityPropertyType.BLOB]: 'BLOB'
	}
});

sqlScriptBuilder.startTable('User', 'userId')
		.addColumn({
			name: 'username',
			type: EntityPropertyType.TEXT,
			length: [30],
			notNull: true,
			unique: true
		} as TableColumnDescriptor)
		.addReference({
			columnName: 'profileId',
			targetTableName: 'Profile',
			targetTableIdentifierColumnName: 'id',
			notNull: true,
			unique: true
		} as TableReferenceDescriptor)
		.endTable()
		.startTable('Profile', 'id')
		.addColumn({
			name: 'realName',
			type: EntityPropertyType.TEXT,
			length: [200],
			notNull: true,
			unique: false
		} as TableColumnDescriptor)
		.endTable()
		.toSql();
