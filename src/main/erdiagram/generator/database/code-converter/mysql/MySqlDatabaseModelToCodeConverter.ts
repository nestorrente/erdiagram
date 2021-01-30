import {DatabaseModel, TableDescriptor} from '@/erdiagram/generator/database/database-model/database-model-types';
import MySqlDatabaseModelToCodeGeneratorConfig, {mergeWithDefaultConfig} from '@/erdiagram/generator/database/code-converter/mysql/MySqlDatabaseModelToCodeGeneratorConfig';
import DatabaseModelToCodeConverter from '@/erdiagram/generator/database/code-converter/DatabaseModelToCodeConverter';
import TableCreationStatements
	from '@/erdiagram/generator/database/code-converter/mysql/column/types/TableCreationStatements';
import MySqlColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/mysql/column/MySqlColumnCodeGenerator';
import MySqlTypeResolver from '@/erdiagram/generator/database/code-converter/mysql/type/MySqlTypeResolver';
import MySqlIdColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/mysql/column/MySqlIdColumnCodeGenerator';
import MySqlForeignColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/mysql/column/MySqlForeignColumnCodeGenerator';

const INDENT: string = '    ';

export default class MySqlDatabaseModelToCodeConverter implements DatabaseModelToCodeConverter {

	private readonly config: MySqlDatabaseModelToCodeGeneratorConfig;
	private readonly columnCodeGenerator: MySqlColumnCodeGenerator;
	private readonly idColumnCodeGenerator: MySqlIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: MySqlForeignColumnCodeGenerator;

	constructor(config?: Partial<MySqlDatabaseModelToCodeGeneratorConfig>) {

		this.config = mergeWithDefaultConfig(config);

		const typeResolver = new MySqlTypeResolver(this.config.typesMap);
		this.columnCodeGenerator = new MySqlColumnCodeGenerator(typeResolver);

		this.idColumnCodeGenerator = new MySqlIdColumnCodeGenerator(
				this.config.idNamingStrategy,
				this.columnCodeGenerator
		);

		this.foreignColumnCodeGenerator = new MySqlForeignColumnCodeGenerator(
				this.config.idNamingStrategy,
				this.columnCodeGenerator
		);

	}

	public generateCode(databaseModel: DatabaseModel): string {

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

		return allCreateTableStatements.join('\n\n')
				+ '\n\n'
				+ allAlterTableStatements.join('\n\n');

	}

	// FIXME split this method
	private generateTableCode(table: TableDescriptor): TableCreationStatements {

		const columnLines: string[] = [];
		const fkConstraintLines: string[] = [];
		const otherConstraintLines: string[] = [];

		const {
			columnLine: idColumnLine,
			pkConstraintLine
		} = this.idColumnCodeGenerator.generateIdColumnCode(table.name);

		columnLines.push(idColumnLine);
		otherConstraintLines.push(pkConstraintLine);

		this.processColumns(table, columnLines, otherConstraintLines);
		this.processReferences(table, columnLines, fkConstraintLines, otherConstraintLines);

		const createTableInnerLines = [
			...columnLines,
			...otherConstraintLines
		];

		const createTableLines = [
			`CREATE TABLE \`${table.name}\` (`,
			this.indentLines(createTableInnerLines).join(',\n'),
			');'
		];

		const createTableStatement = createTableLines.join('\n');
		const alterTableStatements = fkConstraintLines.map(fkConstraintLine => {
			return `ALTER TABLE \`${table.name}\` ADD ${fkConstraintLine};`;
		}).join('\n');

		return {
			createTableStatement,
			alterTableStatements
		};

	}

	private processReferences(table: TableDescriptor, columnLines: string[], fkConstraintLines: string[], otherConstraintLines: string[]) {

		for (const reference of table.references) {

			const {
				columnLine,
				uniqueConstraintLine,
				fkConstraintLine
			} = this.foreignColumnCodeGenerator.generateForeignColumnCode(table.name, reference);

			columnLines.push(columnLine);
			fkConstraintLines.push(fkConstraintLine);

			if (uniqueConstraintLine) {
				otherConstraintLines.push(uniqueConstraintLine);
			}

		}

	}

	private processColumns(table: TableDescriptor, columnLines: string[], otherConstraintLines: string[]) {

		for (const column of table.columns) {

			const {
				columnLine,
				uniqueConstraintLine
			} = this.columnCodeGenerator.generateColumnCode(table.name, column);

			columnLines.push(columnLine);

			if (uniqueConstraintLine) {
				otherConstraintLines.push(uniqueConstraintLine);
			}

		}

	}

	private indentLines(lines: string[]) {
		return lines.map(e => INDENT + e);
	}

}
