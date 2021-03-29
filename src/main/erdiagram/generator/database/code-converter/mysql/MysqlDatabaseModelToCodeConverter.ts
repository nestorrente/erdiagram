import {
	DatabaseModel,
	TableColumnDescriptor,
	TableDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/model/database-model-types';
import MysqlDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfig';
import DatabaseModelToCodeConverter from '@/erdiagram/generator/database/code-converter/DatabaseModelToCodeConverter';
import TableCreationStatements
	from '@/erdiagram/generator/database/code-converter/mysql/column/types/TableCreationStatements';
import MysqlColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/mysql/column/MysqlColumnCodeGenerator';
import MysqlTypeResolver from '@/erdiagram/generator/database/code-converter/mysql/type/MysqlTypeResolver';
import MysqlIdColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/mysql/column/MysqlIdColumnCodeGenerator';
import MysqlForeignColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/mysql/column/MysqlForeignColumnCodeGenerator';
import {indentLines} from '@/erdiagram/util/indent-utils';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import mysqlDatabaseModelToCodeConverterConfigManager
	from '@/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfigManager';

export default class MysqlDatabaseModelToCodeConverter implements DatabaseModelToCodeConverter {

	private readonly config: MysqlDatabaseModelToCodeConverterConfig;

	private readonly tableNameCaseConverter: CaseConverter;

	private readonly columnCodeGenerator: MysqlColumnCodeGenerator;
	private readonly idColumnCodeGenerator: MysqlIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: MysqlForeignColumnCodeGenerator;

	constructor(config?: Partial<MysqlDatabaseModelToCodeConverterConfig>) {

		this.config = mysqlDatabaseModelToCodeConverterConfigManager.mergeWithDefaultConfig(config);

		this.tableNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				this.config.tableNameCaseFormat
		);

		const columnNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				this.config.columnNameCaseFormat
		);

		this.columnCodeGenerator = new MysqlColumnCodeGenerator(
				new MysqlTypeResolver(this.config.typeBindings),
				columnNameCaseConverter
		);

		this.idColumnCodeGenerator = new MysqlIdColumnCodeGenerator(
				this.columnCodeGenerator,
				columnNameCaseConverter
		);

		this.foreignColumnCodeGenerator = new MysqlForeignColumnCodeGenerator(
				this.columnCodeGenerator,
				this.tableNameCaseConverter,
				columnNameCaseConverter
		);

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
