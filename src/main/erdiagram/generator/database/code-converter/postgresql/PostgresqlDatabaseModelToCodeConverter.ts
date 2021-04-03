import {
	DatabaseModel,
	TableColumnDescriptor,
	TableDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/model/database-model-types';
import PostgresqlDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/postgresql/config/PostgresqlDatabaseModelToCodeConverterConfig';
import DatabaseModelToCodeConverter from '@/erdiagram/generator/database/code-converter/DatabaseModelToCodeConverter';
import PostgresqlColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlColumnCodeGenerator';
import PostgresqlTypeResolver
	from '@/erdiagram/generator/database/code-converter/postgresql/type/PostgresqlTypeResolver';
import PostgresqlIdColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlIdColumnCodeGenerator';
import PostgresqlForeignColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlForeignColumnCodeGenerator';
import {indentLines} from '@/erdiagram/util/indent-utils';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import postgresqlDatabaseModelToCodeConverterConfigManager
	from '@/erdiagram/generator/database/code-converter/postgresql/config/PostgresqlDatabaseModelToCodeConverterConfigManager';
import {
	CreateTableLinesWithSequences,
	TableCreationStatements
} from '@/erdiagram/generator/database/code-converter/common/sql-script-types';

export default class PostgresqlDatabaseModelToCodeConverter implements DatabaseModelToCodeConverter {

	private readonly config: PostgresqlDatabaseModelToCodeConverterConfig;

	private readonly tableNameCaseConverter: CaseConverter;

	private readonly columnCodeGenerator: PostgresqlColumnCodeGenerator;
	private readonly idColumnCodeGenerator: PostgresqlIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: PostgresqlForeignColumnCodeGenerator;

	constructor(config?: Partial<PostgresqlDatabaseModelToCodeConverterConfig>) {

		this.config = postgresqlDatabaseModelToCodeConverterConfigManager.mergeWithDefaultConfig(config);

		this.tableNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				this.config.tableNameCaseFormat
		);

		const columnNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				this.config.columnNameCaseFormat
		);

		this.columnCodeGenerator = new PostgresqlColumnCodeGenerator(
				new PostgresqlTypeResolver(this.config.typeBindings),
				columnNameCaseConverter
		);

		this.idColumnCodeGenerator = new PostgresqlIdColumnCodeGenerator(
				this.columnCodeGenerator,
				columnNameCaseConverter
		);

		this.foreignColumnCodeGenerator = new PostgresqlForeignColumnCodeGenerator(
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

		const lines: CreateTableLinesWithSequences = {
			columns: [],
			fkConstraints: [],
			otherConstraints: [],
			sequences: []
		}

		const outputTableName = this.tableNameCaseConverter.convertCase(table.name);

		const {
			columnLine: idColumnLine,
			pkConstraintLine
		} = this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, table.identifierColumnName);

		lines.columns.push(idColumnLine);
		lines.otherConstraints.push(pkConstraintLine);

		this.processColumns(outputTableName, table.columns, lines);
		this.processReferences(outputTableName, table.references, lines);

		const createTableInnerLines = [
			...lines.columns,
			...lines.otherConstraints
		];

		const createTableLines = [
			...lines.sequences,
			`CREATE TABLE "${outputTableName}" (`,
			indentLines(createTableInnerLines).join(',\n'),
			');'
		];

		const createTableStatement = createTableLines.join('\n');
		const alterTableStatements = lines.fkConstraints.map(fkConstraintLine => {
			return `ALTER TABLE "${outputTableName}" ADD ${fkConstraintLine};`;
		}).join('\n');

		return {
			createTableStatement,
			alterTableStatements
		};

	}

	private processColumns(outputTableName: string, columns: TableColumnDescriptor[], lines: CreateTableLinesWithSequences) {

		for (const column of columns) {

			const {
				columnLine,
				createSequenceLine,
				uniqueConstraintLine
			} = this.columnCodeGenerator.generateColumnCode(outputTableName, column);

			lines.columns.push(columnLine);

			if (createSequenceLine) {
				lines.sequences.push(createSequenceLine);
			}

			if (uniqueConstraintLine) {
				lines.otherConstraints.push(uniqueConstraintLine);
			}

		}

	}

	private processReferences(outputTableName: string, references: TableReferenceDescriptor[], lines: CreateTableLinesWithSequences) {

		for (const reference of references) {

			const {
				columnLine,
				uniqueConstraintLine,
				fkConstraintLine
			} = this.foreignColumnCodeGenerator.generateForeignColumnCode(outputTableName, reference);

			lines.columns.push(columnLine);
			lines.fkConstraints.push(fkConstraintLine);

			if (uniqueConstraintLine) {
				lines.otherConstraints.push(uniqueConstraintLine);
			}

		}

	}

}
