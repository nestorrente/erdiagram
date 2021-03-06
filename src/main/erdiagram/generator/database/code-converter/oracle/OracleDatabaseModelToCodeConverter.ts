import {
	DatabaseModel,
	TableColumnDescriptor,
	TableDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/model/database-model-types';
import OracleDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/oracle/config/OracleDatabaseModelToCodeConverterConfig';
import DatabaseModelToCodeConverter from '@/erdiagram/generator/database/code-converter/DatabaseModelToCodeConverter';
import TableCreationStatements
	from '@/erdiagram/generator/database/code-converter/oracle/column/types/TableCreationStatements';
import OracleColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/oracle/column/OracleColumnCodeGenerator';
import OracleTypeResolver from '@/erdiagram/generator/database/code-converter/oracle/type/OracleTypeResolver';
import OracleIdColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/oracle/column/OracleIdColumnCodeGenerator';
import OracleForeignColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/oracle/column/OracleForeignColumnCodeGenerator';
import {indentLines} from '@/erdiagram/util/indent-utils';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import oracleDatabaseModelToCodeConverterConfigManager
	from '@/erdiagram/generator/database/code-converter/oracle/config/OracleDatabaseModelToCodeConverterConfigManager';

export default class OracleDatabaseModelToCodeConverter implements DatabaseModelToCodeConverter {

	private readonly config: OracleDatabaseModelToCodeConverterConfig;

	private readonly tableNameCaseConverter: CaseConverter;

	private readonly columnCodeGenerator: OracleColumnCodeGenerator;
	private readonly idColumnCodeGenerator: OracleIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: OracleForeignColumnCodeGenerator;

	constructor(config?: Partial<OracleDatabaseModelToCodeConverterConfig>) {

		this.config = oracleDatabaseModelToCodeConverterConfigManager.mergeWithDefaultConfig(config);

		this.tableNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				this.config.tableNameCaseFormat
		);

		const columnNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				this.config.columnNameCaseFormat
		);

		this.columnCodeGenerator = new OracleColumnCodeGenerator(
				new OracleTypeResolver(this.config.typeBindings),
				columnNameCaseConverter
		);

		this.idColumnCodeGenerator = new OracleIdColumnCodeGenerator(
				this.columnCodeGenerator,
				columnNameCaseConverter
		);

		this.foreignColumnCodeGenerator = new OracleForeignColumnCodeGenerator(
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
			createSequenceLine: idCreateSequenceLine,
			columnLine: idColumnLine,
			pkConstraintLine
		} = this.idColumnCodeGenerator.generateIdColumnCode(outputTableName, table.identifierColumnName);

		createSequenceLines.push(idCreateSequenceLine);
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
