import {
	DatabaseModel,
	TableColumnDescriptor,
	TableDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/converter/database/model/database-model-types';
import DatabaseModelToCodeConverter from '@/erdiagram/converter/database/code-converter/DatabaseModelToCodeConverter';
import {indentLines} from '@/erdiagram/util/indent-utils';
import {
	CreateTableLines,
	TableCreationStatements
} from '@/erdiagram/converter/database/code-converter/sql/dialect/common/sql-script-types';
import SqlDialect from '@/erdiagram/converter/database/code-converter/sql/dialect/common/SqlDialect';

export default class DatabaseModelToSqlCodeConverter implements DatabaseModelToCodeConverter {

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

		const allScriptStatements = [
			...allCreateTableStatements,
			...allAlterTableStatements
		];

		const scriptStartCode = this.sqlDialect.getScriptStartCode();
		const scriptEndCode = this.sqlDialect.getScriptEndCode();

		if (scriptStartCode) {
			allScriptStatements.unshift(scriptStartCode);
		}

		if (scriptEndCode) {
			allScriptStatements.push(scriptEndCode);
		}

		return allScriptStatements.join('\n\n');

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
		} = this.sqlDialect.getIdColumnCode(table.name, table.identityColumnName);

		if (idCreateSequenceLine) {
			lines.sequences.push(idCreateSequenceLine);
		}

		lines.columns.push(idColumnLine);

		if (pkConstraintLine != null) {
			lines.otherConstraints.push(pkConstraintLine);
		}

		this.processColumns(table.name, table.columns, lines);
		this.processReferences(table.name, table.references, lines);

		const createTableInnerLines = this.getCreateTableInnerLines(lines);

		const createTableLines = [
			...lines.sequences,
			this.sqlDialect.getCreateTableStartCode(table.name),
			indentLines(createTableInnerLines).join(',\n'),
			this.sqlDialect.getCreateTableEndCode()
		];

		const alterTableLines = this.getAlterTableLines(table, lines);

		return {
			createTableStatement: createTableLines.join('\n'),
			alterTableStatements: alterTableLines.join('\n')
		};

	}

	private processColumns(tableName: string, columns: TableColumnDescriptor[], lines: CreateTableLines) {

		for (const column of columns) {

			const {
				columnLine,
				uniqueConstraintLine
			} = this.sqlDialect.getColumnCode(tableName, column);

			lines.columns.push(columnLine);

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
			} = this.sqlDialect.getForeignColumnCode(tableName, reference);

			lines.columns.push(columnLine);
			lines.fkConstraints.push(fkConstraintLine);

			if (uniqueConstraintLine) {
				lines.otherConstraints.push(uniqueConstraintLine);
			}

		}

	}

	private getCreateTableInnerLines(lines: CreateTableLines): string[] {

		const createTableInnerLines = [
			...lines.columns,
			...lines.otherConstraints
		];

		if (!this.sqlDialect.mustUseAlterTableForForeignKeys()) {
			createTableInnerLines.push(...lines.fkConstraints);
		}

		return createTableInnerLines;

	}

	private getAlterTableLines(table: TableDescriptor, lines: CreateTableLines): string[] {

		if (!this.sqlDialect.mustUseAlterTableForForeignKeys()) {
			return [];
		}

		return lines.fkConstraints.map(fkConstraintLine => {
			return this.sqlDialect.getAlterTableAddCode(table.name, fkConstraintLine);
		});

	}

}
