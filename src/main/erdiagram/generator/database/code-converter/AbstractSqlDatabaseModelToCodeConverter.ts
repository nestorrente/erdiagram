import {
	DatabaseModel,
	TableColumnDescriptor,
	TableDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/model/database-model-types';
import DatabaseModelToCodeConverter from '@/erdiagram/generator/database/code-converter/DatabaseModelToCodeConverter';
import {indentLines} from '@/erdiagram/util/indent-utils';
import {
	CreateTableLines,
	TableCreationStatements
} from '@/erdiagram/generator/database/code-converter/common/sql-script-types';
import SqlDialect from '@/erdiagram/generator/database/code-converter/common/SqlDialect';

export default abstract class AbstractSqlDatabaseModelToCodeConverter implements DatabaseModelToCodeConverter {

	constructor(
			private readonly sqlDialect: SqlDialect
	) {

	}

	public convertToCode(databaseModel: DatabaseModel): string {

		const allCreateTableStatements: string[] = [];
		const allAlterTableStatements: string[] = [];

		databaseModel.tables
				.map(table => this.generateTableCode(table))
				.forEach(({createTableStatement, alterTableStatements}) => {

					allCreateTableStatements.push(createTableStatement);

					if (alterTableStatements) {
						allAlterTableStatements.push(alterTableStatements);
					}

				});

		return [
			...allCreateTableStatements,
			...allAlterTableStatements
		].join('\n\n');

	}

	// FIXME split this method
	private generateTableCode(table: TableDescriptor): TableCreationStatements {

		const lines: CreateTableLines = {
			sequences: [],
			columns: [],
			fkConstraints: [],
			otherConstraints: []
		};

		const {
			createSequenceLine: idCreateSequenceLine,
			columnLine: idColumnLine,
			pkConstraintLine
		} = this.sqlDialect.addIdColumn(table.name, table.identifierColumnName);

		if (idCreateSequenceLine) {
			lines.sequences.push(idCreateSequenceLine);
		}

		lines.columns.push(idColumnLine);
		lines.otherConstraints.push(pkConstraintLine);

		this.processColumns(table.name, table.columns, lines);
		this.processReferences(table.name, table.references, lines);

		const createTableInnerLines = [
			...lines.columns,
			...lines.otherConstraints
		];

		const createTableLines = [
			...lines.sequences,
			this.sqlDialect.startTable(table.name),
			indentLines(createTableInnerLines).join(',\n'),
			this.sqlDialect.endTable()
		];

		const createTableStatement = createTableLines.join('\n');
		const alterTableStatements = lines.fkConstraints.map(fkConstraintLine => {
			return this.sqlDialect.addConstraint(table.name, fkConstraintLine);
		}).join('\n');

		return {
			createTableStatement,
			alterTableStatements
		};

	}

	private processColumns(tableName: string, columns: TableColumnDescriptor[], lines: CreateTableLines) {

		for (const column of columns) {

			const {
				columnLine,
				createSequenceLine,
				uniqueConstraintLine
			} = this.sqlDialect.addColumn(tableName, column);

			lines.columns.push(columnLine);

			if (createSequenceLine) {
				lines.sequences.push(createSequenceLine);
			}

			if (uniqueConstraintLine) {
				lines.otherConstraints.push(uniqueConstraintLine);
			}

		}

	}

	private processReferences(tableName: string, references: TableReferenceDescriptor[], lines: CreateTableLines) {

		for (const reference of references) {

			const {
				columnLine,
				uniqueConstraintLine,
				fkConstraintLine
			} = this.sqlDialect.addForeignColumn(tableName, reference);

			lines.columns.push(columnLine);
			lines.fkConstraints.push(fkConstraintLine);

			if (uniqueConstraintLine) {
				lines.otherConstraints.push(uniqueConstraintLine);
			}

		}

	}

}
