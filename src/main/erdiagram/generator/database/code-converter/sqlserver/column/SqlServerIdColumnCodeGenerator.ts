import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import {TableColumnDescriptor} from '@/erdiagram/generator/database/model/database-model-types';
import IdColumnCode from '@/erdiagram/generator/database/code-converter/sqlserver/column/types/IdColumnCode';
import SqlServerColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sqlserver/column/SqlServerColumnCodeGenerator';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';

export default class SqlServerIdColumnCodeGenerator {

	constructor(
			private readonly columnCodeGenerator: SqlServerColumnCodeGenerator,
			private readonly columnNameCaseConverter: CaseConverter,
			private readonly idColumnType: EntityPropertyType
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
			type: this.idColumnType,
			length: [],
			notNull: true,
			// Autoincrement of identity columns have to be achieved using IDENTITY,
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