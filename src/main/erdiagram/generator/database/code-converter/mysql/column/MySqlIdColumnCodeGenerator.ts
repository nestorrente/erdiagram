import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import {TableColumnDescriptor} from '@/erdiagram/generator/database/model/database-model-types';
import IdColumnCode from '@/erdiagram/generator/database/code-converter/mysql/column/types/IdColumnCode';
import MySqlColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/mysql/column/MySqlColumnCodeGenerator';
import IdNamingStrategy from '@/erdiagram/generator/common/id-naming-strategy/IdNamingStrategy';

const INDENT: string = '    ';

export default class MySqlIdColumnCodeGenerator {

	constructor(
			private readonly idNamingStrategy: IdNamingStrategy,
			private readonly columnCodeGenerator: MySqlColumnCodeGenerator,
			private readonly idColumnType: EntityPropertyType
	) {

	}

	public generateIdColumnCode(tableName: string): IdColumnCode {

		const columnDescriptor = this.createIdColumnDescriptor(tableName);

		const {
			columnLine
		} = this.columnCodeGenerator.generateColumnCode(tableName, columnDescriptor);

		const pkConstraintLine = this.createPrimaryKeyConstraint(tableName);

		return {
			columnLine,
			pkConstraintLine
		};

	}

	private createIdColumnDescriptor(tableName: string): TableColumnDescriptor {
		return {
			name: this.getTableId(tableName),
			type: this.idColumnType,
			length: [],
			notNull: true,
			autoincremental: true,
			// As primary keys are unique by default, we don't
			// need to manually define an UNIQUE KEY constraint
			unique: false
		};
	}

	private createPrimaryKeyConstraint(tableName: string) {
		return `CONSTRAINT \`${tableName}_pk\` PRIMARY KEY (\`${this.getTableId(tableName)}\`)`;
	}

	private getTableId(tableName: string) {
		const {idNamingStrategy} = this;
		return idNamingStrategy(tableName);
	}

}
