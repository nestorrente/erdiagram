import {EntityPropertyType} from '@/erdiagram/parser/statement/statement-types-parse-functions';
import {TableColumnDescriptor} from '@/erdiagram/generator/database/database-model/database-model-types';
import RegularColumnCode from '@/erdiagram/generator/database/code-converter/mysql/column/types/RegularColumnCode';
import MySqlTypeResolver from '@/erdiagram/generator/database/code-converter/mysql/type/MySqlTypeResolver';

export default class MySqlColumnCodeGenerator {

	private readonly typeResolver: MySqlTypeResolver;

	constructor(typeResolver: MySqlTypeResolver) {
		this.typeResolver = typeResolver;
	}

	public generateColumnCode(tableName: string, column: TableColumnDescriptor): RegularColumnCode {
		return {
			columnLine: this.generateColumnDeclarationLine(column),
			uniqueConstraintLine: column.unique ? this.generateUniqueConstraintLine(tableName, column.name) : undefined
		};
	}

	private generateColumnDeclarationLine(column: TableColumnDescriptor) {

		const {
			name,
			notNull,
			autoincremental,
			type,
			length
		} = column;

		const lineParts: string[] = [
			`\`${name}\``,
			this.generateMySqlTypeDeclaration(type, length)
		];

		if (notNull) {
			lineParts.push('NOT NULL');
		}

		if (autoincremental) {
			lineParts.push('AUTO_INCREMENT');
		}

		return lineParts.join(' ');

	}

	private generateMySqlTypeDeclaration(type: EntityPropertyType, length: number | undefined) {

		const mysqlType = this.typeResolver.resolveMySqlType(type);

		if (length) {
			return `${mysqlType}(${length})`;
		}

		return mysqlType;

	}

	private generateUniqueConstraintLine(tableName: string, columnName: string) {
		return `CONSTRAINT \`${tableName}_${columnName}_unique\` UNIQUE (\`${columnName}\`)`;
	}

}
