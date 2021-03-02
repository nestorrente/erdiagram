import {
	DatabaseModel,
	TableColumnDescriptor,
	TableDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/model/database-model-types';
import SqlServerDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterConfig';
import DatabaseModelToCodeConverter from '@/erdiagram/generator/database/code-converter/DatabaseModelToCodeConverter';
import TableCreationStatements
	from '@/erdiagram/generator/database/code-converter/sqlserver/column/types/TableCreationStatements';
import SqlServerColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerColumnCodeGenerator';
import SqlServerTypeResolver from '@/erdiagram/generator/database/code-converter/sqlserver/type/SqlServerTypeResolver';
import SqlServerIdColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerIdColumnCodeGenerator';
import SqlServerForeignColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerForeignColumnCodeGenerator';
import {indentLines} from '@/erdiagram/util/indent-utils';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import sqlServerDatabaseModelToCodeConverterConfigManager
	from '@/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterConfigManager';

export default class SqlServerDatabaseModelToCodeConverter implements DatabaseModelToCodeConverter {

	private readonly config: SqlServerDatabaseModelToCodeConverterConfig;

	private readonly tableNameCaseConverter: CaseConverter;

	private readonly columnCodeGenerator: SqlServerColumnCodeGenerator;
	private readonly idColumnCodeGenerator: SqlServerIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: SqlServerForeignColumnCodeGenerator;

	constructor(config?: Partial<SqlServerDatabaseModelToCodeConverterConfig>) {

		this.config = sqlServerDatabaseModelToCodeConverterConfigManager.mergeWithDefaultConfig(config);

		this.tableNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				this.config.tableNameCaseFormat
		);

		const columnNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				this.config.columnNameCaseFormat
		);

		this.columnCodeGenerator = new SqlServerColumnCodeGenerator(
				new SqlServerTypeResolver(this.config.typeBindings),
				columnNameCaseConverter
		);

		this.idColumnCodeGenerator = new SqlServerIdColumnCodeGenerator(
				this.columnCodeGenerator,
				columnNameCaseConverter
		);

		this.foreignColumnCodeGenerator = new SqlServerForeignColumnCodeGenerator(
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
		const createSequenceLines: string[] = [];
		const fkConstraintLines: string[] = [];
		const otherConstraintLines: string[] = [];

		const outputTableName = this.tableNameCaseConverter.convertCase(table.name);

		const {
			columnLine: idColumnLine,
			pkConstraintLine
		} = this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, table.identifierColumnName);

		columnLines.push(idColumnLine);
		otherConstraintLines.push(pkConstraintLine);

		this.processColumns(outputTableName, table.columns, columnLines, createSequenceLines, otherConstraintLines);
		this.processReferences(outputTableName, table.references, columnLines, fkConstraintLines, otherConstraintLines);

		const createTableInnerLines = [
			...columnLines,
			...otherConstraintLines
		];

		const createTableLines = [
			...createSequenceLines,
			`CREATE TABLE "${outputTableName}" (`,
			indentLines(createTableInnerLines).join(',\n'),
			');'
		];

		const createTableStatement = createTableLines.join('\n');
		const alterTableStatements = fkConstraintLines.map(fkConstraintLine => {
			return `ALTER TABLE "${outputTableName}" ADD ${fkConstraintLine};`;
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

	private processColumns(
			outputTableName: string,
			columns: TableColumnDescriptor[],
			columnLines: string[],
			createSequenceLines: string[],
			otherConstraintLines: string[]
	) {

		for (const column of columns) {

			const {
				columnLine,
				createSequenceLine,
				uniqueConstraintLine
			} = this.columnCodeGenerator.generateColumnCode(outputTableName, column);

			columnLines.push(columnLine);

			if (createSequenceLine) {
				createSequenceLines.push(createSequenceLine);
			}

			if (uniqueConstraintLine) {
				otherConstraintLines.push(uniqueConstraintLine);
			}

		}

	}

}
