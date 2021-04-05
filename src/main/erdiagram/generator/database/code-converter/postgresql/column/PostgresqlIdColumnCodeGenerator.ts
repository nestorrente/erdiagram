import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {TableColumnDescriptor} from '@/erdiagram/generator/database/model/database-model-types';
import PostgresqlColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/postgresql/column/PostgresqlColumnCodeGenerator';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import {IdColumnCode} from '@/erdiagram/generator/database/code-converter/common/sql-script-types';
import SqlIdColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/common/column/SqlIdColumnCodeGenerator';

export default class PostgresqlIdColumnCodeGenerator implements SqlIdColumnCodeGenerator {

	constructor(
			private readonly columnCodeGenerator: PostgresqlColumnCodeGenerator,
			private readonly columnNameCaseConverter: CaseConverter
	) {

	}

	public generateIdColumnCode(outputTableName: string, identifierColumnName: string): IdColumnCode {

		const column = this.createIdColumnDescriptor(identifierColumnName);

		const {
			columnLine
		} = this.columnCodeGenerator.generateColumnCode(outputTableName, column, true);

		const pkConstraintLine = this.createPrimaryKeyConstraint(outputTableName, column);

		return {
			columnLine,
			pkConstraintLine
		};

	}

	private createIdColumnDescriptor(identifierColumnName: string): TableColumnDescriptor {
		return {
			name: identifierColumnName,
			type: EntityPropertyType.IDENTIFIER,
			length: [],
			notNull: true,
			// Autoincrement of identity columns have to be achieved using serial types,
			// while other autoincremental columns have to use a custom sequence.
			autoincremental: false,
			// As primary keys are unique by default, we don't
			// need to manually define an UNIQUE KEY constraint
			unique: false
		};
	}

	private createPrimaryKeyConstraint(outputTableName: string, column: TableColumnDescriptor) {
		const columnName = this.columnNameCaseConverter.convertCase(column.name);
		return `CONSTRAINT "${outputTableName}_pk" PRIMARY KEY ("${columnName}")`;
	}

}
