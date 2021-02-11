import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import {TableColumnDescriptor} from '@/erdiagram/generator/database/model/database-model-types';
import IdColumnCode from '@/erdiagram/generator/database/code-converter/mysql/column/types/IdColumnCode';
import MySqlColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/mysql/column/MySqlColumnCodeGenerator';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';

export default class MySqlIdColumnCodeGenerator {

	constructor(
			private readonly columnCodeGenerator: MySqlColumnCodeGenerator,
			private readonly columnNameCaseConverter: CaseConverter,
			private readonly idColumnType: EntityPropertyType
	) {

	}

	public generateIdColumnCode(outputTableName: string, identifierColumnName: string): IdColumnCode {

		const column = this.createIdColumnDescriptor(identifierColumnName);

		const {
			columnLine
		} = this.columnCodeGenerator.generateColumnCode(outputTableName, column);

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
			autoincremental: true,
			// As primary keys are unique by default, we don't
			// need to manually define an UNIQUE KEY constraint
			unique: false
		};
	}

	private createPrimaryKeyConstraint(outputTableName: string, column: TableColumnDescriptor) {
		const columnName = this.columnNameCaseConverter.convertCase(column.name);
		return `CONSTRAINT \`${outputTableName}_pk\` PRIMARY KEY (\`${columnName}\`)`;
	}

}
