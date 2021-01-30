import {EntityPropertyType} from '@/erdiagram/parser/statement/statement-types-parse-functions';
import {
	TableColumnDescriptor,
	TableReferenceDescriptor
} from '@/erdiagram/generator/database/database-model/database-model-types';
import ForeignKeyColumnCode
	from '@/erdiagram/generator/database/code-converter/mysql/column/types/ForeignKeyColumnCode';
import MySqlColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/mysql/column/MySqlColumnCodeGenerator';
import IdNamingStrategy from '@/erdiagram/generator/common/id-naming-strategy/IdNamingStrategy';

const INDENT: string = '    ';

export default class MySqlForeignColumnCodeGenerator {

	private readonly columnCodeGenerator: MySqlColumnCodeGenerator;
	private readonly idNamingStrategy: IdNamingStrategy;

	constructor(idNamingStrategy: IdNamingStrategy, columnCodeGenerator: MySqlColumnCodeGenerator) {
		this.idNamingStrategy = idNamingStrategy;
		this.columnCodeGenerator = columnCodeGenerator;
	}

	public generateForeignColumnCode(tableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode {

		const columnDescriptor = this.createForeignKeyColumnDescriptor(reference);

		const {
			columnLine,
			uniqueConstraintLine
		} = this.columnCodeGenerator.generateColumnCode(tableName, columnDescriptor);

		return {
			columnLine,
			uniqueConstraintLine,
			fkConstraintLine: this.createForeignKeyConstraint(tableName, reference)
		};

	}

	private createForeignKeyColumnDescriptor(reference: TableReferenceDescriptor): TableColumnDescriptor {

		const {
			columnName,
			notNull,
			unique
		} = reference;

		return {
			name: columnName,
			type: EntityPropertyType.LONG,
			notNull,
			unique,
			autoincremental: false
		};

	}

	private createForeignKeyConstraint(tableName: string, reference: TableReferenceDescriptor) {
		return `CONSTRAINT \`${tableName}_${reference.columnName}_fk\` FOREIGN KEY (\`${reference.columnName}\`)`
				+ ` REFERENCES \`${reference.targetTableName}\` (\`${this.getTableId(reference.targetTableName)}\`)`;
	}

	private getTableId(tableName: string) {
		const {idNamingStrategy} = this;
		return idNamingStrategy(tableName);
	}

}
