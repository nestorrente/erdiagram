import EntityRelationshipModelToCodeConverter from '@/dsl/generator/entity-relationship-to-code-converter';
import {EntityRelationshipModel} from '@/dsl/parser/er-model-parser';
import {EntityPropertyType} from '@/dsl/parser/statement/statement-types-parse-functions';
import databaseModelGenerator from '@/dsl/generator/database/database-model/database-model-generator';
import {
	DatabaseModel,
	TableColumnDescriptor,
	TableDescriptor,
	TableReferenceDescriptor
} from '@/dsl/generator/database/database-model/database-model-types';
import MySqlCodeGeneratorConfig, {mergeWithDefaultConfig} from '@/dsl/generator/database/sql/mysql/mysql-code-generator-config';

const INDENT: string = '    ';

export default class MySqlCodeGenerator implements EntityRelationshipModelToCodeConverter {

	private readonly config: MySqlCodeGeneratorConfig;

	constructor(config?: Partial<MySqlCodeGeneratorConfig>) {
		this.config = mergeWithDefaultConfig(config);
	}

	public generateCode(entityRelationshipModel: EntityRelationshipModel): string {

		const databaseModel = databaseModelGenerator.generateDatabaseModel(entityRelationshipModel);

		return databaseModel.tables
				.map(table => this.generateTable(table, databaseModel))
				.join('\n\n');

	}

	private generateTable(table: TableDescriptor, model: DatabaseModel): string {

		const tableId = this.getTableId(table.name);

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

		const mysqlType = this.mapPropertyTypeToSqlType(type);

		if (length) {
			lineParts.push(`${mysqlType}(${length})`);
		} else {
			lineParts.push(mysqlType);
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
				+ ` REFERENCES ${reference.targetTableName} (${this.getTableId(reference.targetTableName)})`;
	}

	private getTableId(entityName: string) {
		const {idNamingStrategy} = this.config;
		return idNamingStrategy(entityName);
	}

	private mapPropertyTypeToSqlType(type: EntityPropertyType): string {

		const {typesMap} = this.config;

		if (!typesMap.hasOwnProperty(type)) {
			throw new Error('Unsupported type: ' + type);
		}

		return typesMap[type];

	}

}

function indentLines(lines: string[]) {
	return lines.map(e => INDENT + e);
}
