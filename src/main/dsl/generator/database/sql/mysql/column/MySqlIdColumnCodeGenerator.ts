import {EntityPropertyType} from '@/dsl/parser/statement/statement-types-parse-functions';
import {TableColumnDescriptor} from '@/dsl/generator/database/database-model/database-model-types';
import IdColumnCode from '@/dsl/generator/database/sql/mysql/column/types/IdColumnCode';
import MySqlColumnCodeGenerator from '@/dsl/generator/database/sql/mysql/column/MySqlColumnCodeGenerator';
import IdNamingStrategy from '@/dsl/generator/common/id-naming-strategy';

const INDENT: string = '    ';

export default class MySqlIdColumnCodeGenerator {

	private readonly columnCodeGenerator: MySqlColumnCodeGenerator;
	private readonly idNamingStrategy: IdNamingStrategy;

	constructor(idNamingStrategy: IdNamingStrategy, columnCodeGenerator: MySqlColumnCodeGenerator) {
		this.idNamingStrategy = idNamingStrategy;
		this.columnCodeGenerator = columnCodeGenerator;
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
			type: EntityPropertyType.LONG,
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
