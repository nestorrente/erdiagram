import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import {TableColumnDescriptor} from '@/erdiagram/generator/database/model/database-model-types';
import IdColumnCode from '@/erdiagram/generator/database/code-converter/mysql/column/types/IdColumnCode';
import MySqlColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/mysql/column/MySqlColumnCodeGenerator';
import IdNamingStrategy from '@/erdiagram/generator/common/id-naming-strategy/IdNamingStrategy';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';

const INDENT: string = '    ';

export default class MySqlIdColumnCodeGenerator {

	constructor(
			private readonly idNamingStrategy: IdNamingStrategy,
			private readonly columnCodeGenerator: MySqlColumnCodeGenerator,
			private readonly columnNameCaseConverter: CaseConverter,
			private readonly idColumnType: EntityPropertyType
	) {

	}

	public generateIdColumnCode(inputTableName: string, outputTableName: string): IdColumnCode {

		const column = this.createIdColumnDescriptor(inputTableName);

		const {
			columnLine
		} = this.columnCodeGenerator.generateColumnCode(outputTableName, column);

		const pkConstraintLine = this.createPrimaryKeyConstraint(outputTableName, column);

		return {
			columnLine,
			pkConstraintLine
		};

	}

	private createIdColumnDescriptor(tableDescriptorName: string): TableColumnDescriptor {
		return {
			name: this.getTableId(tableDescriptorName),
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

	private getTableId(tableDescriptorName: string) {
		const {idNamingStrategy} = this;
		return idNamingStrategy(tableDescriptorName);
	}

}
