import {EntityPropertyType} from '@/dsl/parser/statement/statement-types-parse-functions';
import {
	DatabaseModel,
	TableColumnDescriptor,
	TableDescriptor,
	TableReferenceDescriptor
} from '@/dsl/generator/database/database-model/database-model-types';
import MySqlDatabaseModelToCodeGeneratorConfig, {mergeWithDefaultConfig} from '@/dsl/generator/database/sql/mysql/MySqlDatabaseModelToCodeGeneratorConfig';
import DatabaseModelToCodeConverter from '@/dsl/generator/database/sql/DatabaseModelToCodeConverter';

const INDENT: string = '    ';

interface IdColumnCode {
	columnLine: string;
	pkConstraintLine: string;
}

interface RegularColumnCode {
	columnLine: string;
	ukConstraintLine?: string;
}

interface ForeignColumnCode extends RegularColumnCode {
	fkConstraintLine: string;
}

export default class MySqlDatabaseModelToCodeConverter implements DatabaseModelToCodeConverter {

	private readonly config: MySqlDatabaseModelToCodeGeneratorConfig;

	constructor(config?: Partial<MySqlDatabaseModelToCodeGeneratorConfig>) {
		this.config = mergeWithDefaultConfig(config);
	}

	public generateCode(databaseModel: DatabaseModel): string {

		const allCreateTableStatements: string[] = [];
		const allAlterTableStatements: string[] = [];

		databaseModel.tables
				.map(table => this.generateTable(table))
				.forEach(({createTableStatement, alterTableStatements}) => {

					allCreateTableStatements.push(createTableStatement);

					if (alterTableStatements) {
						allAlterTableStatements.push(alterTableStatements);
					}

				});

		return allCreateTableStatements.join('\n\n')
				+ '\n\n'
				+ allAlterTableStatements.join('\n\n');

	}

	private generateTable(table: TableDescriptor) {

		const columnLines: string[] = [];
		const fkConstraintLines: string[] = [];
		const otherConstraintLines: string[] = [];

		const {
			columnLine: idColumnLine,
			pkConstraintLine
		} = this.createIdColumn(table.name);

		columnLines.push(idColumnLine);
		otherConstraintLines.push(pkConstraintLine);

		for (const column of table.columns) {

			const {
				columnLine,
				ukConstraintLine
			} = this.createColumn(table.name, column);

			columnLines.push(columnLine);

			if (ukConstraintLine) {
				otherConstraintLines.push(ukConstraintLine);
			}

		}

		for (const reference of table.references) {

			const {
				columnLine,
				ukConstraintLine,
				fkConstraintLine
			} = this.createForeignColumn(table.name, reference);

			columnLines.push(columnLine);
			fkConstraintLines.push(fkConstraintLine);

			if (ukConstraintLine) {
				otherConstraintLines.push(ukConstraintLine);
			}

		}

		const createTableInnerLines = [
			...columnLines,
			...otherConstraintLines
		];

		const createTableLines = [
			`CREATE TABLE ${table.name} (`,
			indentLines(createTableInnerLines).join(',\n'),
			');'
		];

		const createTableStatement = createTableLines.join('\n');
		const alterTableStatements = fkConstraintLines.map(fkConstraintLine => `ALTER TABLE ${table.name} ADD ${fkConstraintLine};`).join('\n');

		return {
			createTableStatement,
			alterTableStatements
		};

	}

	private createIdColumn(tableName: string): IdColumnCode {

		const columnDescriptor = this.createIdColumnDescriptor(tableName);

		const {
			columnLine
		} = this.createColumn(tableName, columnDescriptor);

		const pkConstraintLine = this.createPrimaryKeyConstraint(tableName);

		return {
			columnLine,
			pkConstraintLine
		};

	}

	private createIdColumnDescriptor(tableName: string) {
		return {
			name: this.getTableId(tableName),
			type: EntityPropertyType.LONG,
			notNull: true,
			autoincremental: true,
			// As primary keys are unique by default, we don't
			// need to manually define an UNIQUE KEY constraint
			unique: false
		};
	}

	private createPrimaryKeyConstraint(tableName: string) {
		return `CONSTRAINT ${tableName}_pk PRIMARY KEY (${this.getTableId(tableName)})`;
	}

	private createForeignColumn(tableName: string, reference: TableReferenceDescriptor): ForeignColumnCode {

		const columnDescriptor = this.createForeignKeyColumnDescriptor(reference);

		const {
			columnLine,
			ukConstraintLine
		} = this.createColumn(tableName, columnDescriptor);

		return {
			columnLine,
			ukConstraintLine,
			fkConstraintLine: this.createForeignKeyConstraint(tableName, reference)
		};

	}

	private createForeignKeyColumnDescriptor(reference: TableReferenceDescriptor): TableColumnDescriptor {

		const {
			columnName,
			notNull,
			unique
		} = reference;

		return {
			name: columnName,
			type: EntityPropertyType.LONG,
			notNull,
			unique,
			autoincremental: false
		};

	}

	private createForeignKeyConstraint(tableName: string, reference: TableReferenceDescriptor) {
		return `CONSTRAINT ${tableName}_${reference.columnName}_fk FOREIGN KEY (${reference.columnName})`
				+ ` REFERENCES ${reference.targetTableName} (${this.getTableId(reference.targetTableName)})`;
	}

	private getTableId(tableName: string) {
		const {idNamingStrategy} = this.config;
		return idNamingStrategy(tableName);
	}

	private createColumn(tableName: string, column: TableColumnDescriptor): RegularColumnCode {
		return {
			columnLine: this.createColumnLine(column),
			ukConstraintLine: column.unique ? this.createUniqueConstraint(tableName, column.name) : undefined
		};
	}

	private createColumnLine(column: TableColumnDescriptor) {

		const {
			name,
			notNull,
			autoincremental,
			unique,
			type,
			length
		} = column;

		const lineParts: string[] = [
			name
		];

		const mysqlType = this.mapPropertyTypeToSqlType(type);

		if (length) {
			lineParts.push(`${mysqlType}(${length})`);
		} else {
			lineParts.push(mysqlType);
		}

		if (notNull) {
			lineParts.push('NOT NULL');
		}

		if (autoincremental) {
			lineParts.push('AUTO_INCREMENT');
		}

		return lineParts.join(' ');

	}

	private mapPropertyTypeToSqlType(type: EntityPropertyType): string {

		const {typesMap} = this.config;

		if (!typesMap.hasOwnProperty(type)) {
			throw new Error('Unsupported type: ' + type);
		}

		return typesMap[type];

	}

	private createUniqueConstraint(tableName: string, columnName: string) {
		return `CONSTRAINT ${tableName}_${columnName}_uk UNIQUE (${columnName})`;
	}

}

function indentLines(lines: string[]) {
	return lines.map(e => INDENT + e);
}
