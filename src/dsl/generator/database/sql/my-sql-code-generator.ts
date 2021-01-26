import {ModelCodeGenerator} from '../../types';
import {EntityRelationshipModel} from '../../../parser/er-model-parser';
import {EntityPropertyType} from '../../../parser/statement/statement-types-parse-functions';
import databaseModelGenerator from '../database-model/database-model-generator';
import {
	DatabaseModel,
	TableColumnDescriptor,
	TableDescriptor,
	TableReferenceDescriptor
} from '../database-model/database-model-types';

const INDENT: string = '    ';

export default class MySqlCodeGenerator implements ModelCodeGenerator {

	public generateCode(entityRelationshipModel: EntityRelationshipModel): string {

		const databaseModel = databaseModelGenerator.generateDatabaseModel(entityRelationshipModel);

		return databaseModel.tables
				.map(table => this.generateTable(table, databaseModel))
				.join('\n\n');

	}

	private generateTable(table: TableDescriptor, model: DatabaseModel): string {

		const tableId = getTableId(table.name);

		const columnLines: string[] = [
			this.createIdColumn(tableId)
		];

		const constraintLines: string[] = [
			this.createPrimaryKeyConstraint(table, tableId)
		];

		for (const column of table.columns) {
			columnLines.push(this.createColumn(column));
		}

		for (const reference of table.references) {

			const {
				columnLine,
				constraintLine
			} = this.createForeignColumn(table.name, reference, model);

			columnLines.push(columnLine);
			constraintLines.push(constraintLine);

		}

		const lines = [
			...columnLines,
			...constraintLines
		];

		return [
			`CREATE TABLE ${table.name} (`,
			indentLines(lines).join(',\n'),
			');'
		].join('\n');

	}

	private createPrimaryKeyConstraint(table: TableDescriptor, tableId: string) {
		return `CONSTRAINT ${table.name}_pk PRIMARY KEY (${tableId})`;
	}

	private createIdColumn(tableId: string) {

		const columnCode = this.createColumn({
			name: tableId,
			type: EntityPropertyType.LONG,
			notNull: true
		});

		return columnCode + ' AUTO_INCREMENT';

	}

	private createColumn(column: TableColumnDescriptor) {

		const {
			name,
			notNull,
			type,
			length
		} = column;

		const lineParts: string[] = [];
		lineParts.push(name);

		const mappedType = mapPropertyTypeToSqlType(type);

		if (length) {
			lineParts.push(`${type}(${length})`);
		} else {
			lineParts.push(type);
		}

		if (notNull) {
			lineParts.push('NOT NULL');
		}

		return lineParts.join(' ');

	}

	private createForeignColumn(sourceTableName: string, reference: TableReferenceDescriptor, model: DatabaseModel) {

		const column: TableColumnDescriptor = {
			name: reference.columnName,
			type: EntityPropertyType.LONG,
			notNull: reference.notNull
		};

		return {
			columnLine: this.createColumn(column),
			constraintLine: this.createForeignKey(sourceTableName, reference)
		};

	}

	private createForeignKey(sourceTableName: string, reference: TableReferenceDescriptor) {
		return `CONSTRAINT ${sourceTableName}_${reference.alias}_fk FOREIGN KEY (${reference.columnName})`
				+ ` REFERENCES ${reference.targetTableName} (${getTableId(reference.targetTableName)})`;
	}

}

function indentLines(lines: string[]) {
	return lines.map(e => INDENT + e);
}

function getTableId(entityName: string) {
	// return uncapitalize(entityName) + 'Id';
	return 'id';
}

function mapPropertyTypeToSqlType(type: EntityPropertyType): string {

	const typesMap: Record<string, string> = {
		[EntityPropertyType.TEXT]: 'VARCHAR',
		[EntityPropertyType.LONG]: 'BIGINT',
		[EntityPropertyType.INT]: 'INT',
		[EntityPropertyType.DECIMAL]: 'DECIMAL',
		[EntityPropertyType.BOOLEAN]: 'BOOLEAN',
		[EntityPropertyType.DATE]: 'DATE',
		[EntityPropertyType.TIME]: 'TIME',
		[EntityPropertyType.DATETIME]: 'TIMESTAMP'
	};

	if (!typesMap.hasOwnProperty(type)) {
		throw new Error('Unsupported type: ' + type);
	}

	return typesMap[type];

}
