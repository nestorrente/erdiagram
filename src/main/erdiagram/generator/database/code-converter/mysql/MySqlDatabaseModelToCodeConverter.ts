import {
	DatabaseModel,
	TableColumnDescriptor,
	TableDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/model/database-model-types';
import MySqlDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/mysql/config/MySqlDatabaseModelToCodeConverterConfig';
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
import {indentLines} from '@/erdiagram/util/indent-utils';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import mysqlDatabaseModelToCodeConverterConfigManager
	from '@/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfigManager';

export default class MySqlDatabaseModelToCodeConverter implements DatabaseModelToCodeConverter {

	private readonly config: MySqlDatabaseModelToCodeConverterConfig;

	private readonly tableNameCaseConverter: CaseConverter;

	private readonly columnCodeGenerator: MySqlColumnCodeGenerator;
	private readonly idColumnCodeGenerator: MySqlIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: MySqlForeignColumnCodeGenerator;

	constructor(config?: Partial<MySqlDatabaseModelToCodeConverterConfig>) {

		this.config = mysqlDatabaseModelToCodeConverterConfigManager.mergeWithDefaultConfig(config);

		this.tableNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				this.config.tableNameCaseFormat
		);

		const columnNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				this.config.columnNameCaseFormat
		);

		this.columnCodeGenerator = new MySqlColumnCodeGenerator(
				new MySqlTypeResolver(this.config.typeMappings),
				columnNameCaseConverter
		);

		this.idColumnCodeGenerator = new MySqlIdColumnCodeGenerator(
				this.columnCodeGenerator,
				columnNameCaseConverter,
				this.config.idColumnType
		);

		this.foreignColumnCodeGenerator = new MySqlForeignColumnCodeGenerator(
				this.columnCodeGenerator,
				this.tableNameCaseConverter,
				columnNameCaseConverter
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

		const outputTableName = this.tableNameCaseConverter.convertCase(table.name);

		const {
			columnLine: idColumnLine,
			pkConstraintLine
		} = this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, table.identifierColumnName);

		columnLines.push(idColumnLine);
		otherConstraintLines.push(pkConstraintLine);

		this.processColumns(outputTableName, table.columns, columnLines, otherConstraintLines);
		this.processReferences(outputTableName, table.references, columnLines, fkConstraintLines, otherConstraintLines);

		const createTableInnerLines = [
			...columnLines,
			...otherConstraintLines
		];

		const createTableLines = [
			`CREATE TABLE \`${outputTableName}\` (`,
			indentLines(createTableInnerLines).join(',\n'),
			');'
		];

		const createTableStatement = createTableLines.join('\n');
		const alterTableStatements = fkConstraintLines.map(fkConstraintLine => {
			return `ALTER TABLE \`${outputTableName}\` ADD ${fkConstraintLine};`;
		}).join('\n');

		return {
			createTableStatement,
			alterTableStatements
		};

	}

	private processReferences(outputTableName: string, references: TableReferenceDescriptor[], columnLines: string[], fkConstraintLines: string[], otherConstraintLines: string[]) {

		for (const reference of references) {

			const {
				columnLine,
				uniqueConstraintLine,
				fkConstraintLine
			} = this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);

			columnLines.push(columnLine);
			fkConstraintLines.push(fkConstraintLine);

			if (uniqueConstraintLine) {
				otherConstraintLines.push(uniqueConstraintLine);
			}

		}

	}

	private processColumns(outputTableName: string, columns: TableColumnDescriptor[], columnLines: string[], otherConstraintLines: string[]) {

		for (const column of columns) {

			const {
				columnLine,
				uniqueConstraintLine
			} = this.columnCodeGenerator.generateColumnCode(outputTableName, column);

			columnLines.push(columnLine);

			if (uniqueConstraintLine) {
				otherConstraintLines.push(uniqueConstraintLine);
			}

		}

	}

}
