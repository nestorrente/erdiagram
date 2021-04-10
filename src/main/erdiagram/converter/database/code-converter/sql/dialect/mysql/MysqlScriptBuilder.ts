import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import SqlScriptBuilder, {SqlTableBuilder} from '@/erdiagram/converter/database/code-converter/sql/dialect/common/SqlScriptBuilder';
import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/converter/database/model/database-model-types';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import SqlTypeResolver from '@/erdiagram/converter/database/code-converter/sql/dialect/common/SqlTypeResolver';
import MysqlColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/mysql/column/MysqlColumnCodeGenerator';
import MysqlIdColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/mysql/column/MysqlIdColumnCodeGenerator';
import MysqlForeignColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/mysql/column/MysqlForeignColumnCodeGenerator';
import SqlForeignColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/common/column/SqlForeignColumnCodeGenerator';
import SqlColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/common/column/SqlColumnCodeGenerator';
import SqlIdColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/common/column/SqlIdColumnCodeGenerator';
import MysqlDialectConfig
	from '@/erdiagram/converter/database/code-converter/sql/dialect/mysql/config/MysqlDialectConfig';

class FinalizableBuilder {

	private finalized: boolean = false;

	protected ensureNotFinalized() {
		if (this.finalized) {
			throw new Error('Illegal state: this builder is finalized');
		}
	}

	protected finalize() {
		this.ensureNotFinalized();
		this.finalized = true;
	}

}

export default class MysqlScriptBuilder extends FinalizableBuilder implements SqlScriptBuilder {

	private readonly tableNameCaseConverter: CaseConverter;

	private readonly columnCodeGenerator: MysqlColumnCodeGenerator;
	private readonly idColumnCodeGenerator: MysqlIdColumnCodeGenerator;
	private readonly foreignColumnCodeGenerator: MysqlForeignColumnCodeGenerator;

	private creatingTable: boolean;
	private readonly tablesCode: string[];

	constructor(dialectConfig: MysqlDialectConfig) {

		super();

		this.tableNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				dialectConfig.tableNameCaseFormat
		);

		const columnNameCaseConverter = new CaseConverter(
				StandardCaseFormats.LOWER_CAMEL,
				dialectConfig.columnNameCaseFormat
		);

		const sqlTypeResolver = new SqlTypeResolver(dialectConfig.typeBindings);

		this.columnCodeGenerator = new MysqlColumnCodeGenerator(
				sqlTypeResolver,
				columnNameCaseConverter
		);

		this.idColumnCodeGenerator = new MysqlIdColumnCodeGenerator(
				sqlTypeResolver,
				columnNameCaseConverter
		);

		this.foreignColumnCodeGenerator = new MysqlForeignColumnCodeGenerator(
				this.columnCodeGenerator,
				this.tableNameCaseConverter,
				columnNameCaseConverter
		);

		this.creatingTable = false;
		this.tablesCode = [];

	}

	startTable(user: string, userId: string): SqlTableBuilder {
		this.ensureNotCreatingTable();
		return new MysqlTableBuilder(
				this.tableNameCaseConverter,
				this.columnCodeGenerator,
				this.idColumnCodeGenerator,
				this.foreignColumnCodeGenerator,
				tableCode => {
					this.tablesCode.push(tableCode);
					return this;
				}
		);
	}

	toSql(): string {
		this.finalize();
		return this.tablesCode.join('\n\n');
	}

	private ensureNotCreatingTable() {
		if (this.creatingTable) {
			throw new Error('Illegal state: unterminated table');
		}
	}

}

class MysqlTableBuilder extends FinalizableBuilder implements SqlTableBuilder {

	constructor(
			private readonly tableNameCaseConverter: CaseConverter,
			private readonly columnCodeGenerator: SqlColumnCodeGenerator,
			private readonly idColumnCodeGenerator: SqlIdColumnCodeGenerator,
			private readonly foreignColumnCodeGenerator: SqlForeignColumnCodeGenerator,
			private readonly goBackToScriptBuilderCallback: (tableCode: string) => SqlScriptBuilder
	) {
		super();
	}

	addColumn(columnDescriptor: TableColumnDescriptor): SqlTableBuilder {
		this.ensureNotFinalized();
		this.doAddColumn(columnDescriptor);
		return this;
	}

	doAddColumn(columnDescriptor: TableColumnDescriptor) {
		// TODO do the real thing
	}

	addReference(referenceDescriptor: TableReferenceDescriptor): SqlTableBuilder {
		this.ensureNotFinalized();
		this.doAddReference(referenceDescriptor);
		return this;
	}

	protected doAddReference(referenceDescriptor: TableReferenceDescriptor) {
		// TODO do the real thing
	}

	endTable(): SqlScriptBuilder {
		this.finalize();
		return this.goBackToScriptBuilderCallback('CREATE TABLE mock ();');
	}

}
