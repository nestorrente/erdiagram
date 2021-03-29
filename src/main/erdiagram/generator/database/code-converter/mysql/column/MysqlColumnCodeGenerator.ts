import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import {TableColumnDescriptor} from '@/erdiagram/generator/database/model/database-model-types';
import RegularColumnCode from '@/erdiagram/generator/database/code-converter/mysql/column/types/RegularColumnCode';
import MysqlTypeResolver from '@/erdiagram/generator/database/code-converter/mysql/type/MysqlTypeResolver';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';

export default class MysqlColumnCodeGenerator {

	constructor(
			private readonly typeResolver: MysqlTypeResolver,
			private readonly columnNameCaseConverter: CaseConverter
	) {

	}

	public generateColumnCode(outputTableName: string, column: TableColumnDescriptor): RegularColumnCode {

		const outputColumnName = this.columnNameCaseConverter.convertCase(column.name);

		return {
			columnLine: this.generateColumnDeclarationLine(outputColumnName, column),
			uniqueConstraintLine: column.unique ? this.generateUniqueConstraintLine(outputTableName, outputColumnName) : undefined
		};

	}

	private generateColumnDeclarationLine(outputColumnName: string, column: TableColumnDescriptor): string {

		const {
			notNull,
			autoincremental,
			type,
			length
		} = column;

		const lineParts: string[] = [
			`\`${outputColumnName}\``,
			this.generateMysqlTypeDeclaration(type, length)
		];

		if (notNull) {
			lineParts.push('NOT NULL');
		}

		if (autoincremental) {
			lineParts.push('AUTO_INCREMENT');
		}

		return lineParts.join(' ');

	}

	private generateMysqlTypeDeclaration(type: EntityPropertyType, length: number[]) {

		const mysqlType = this.typeResolver.resolveMysqlType(type);
		const lengthCode = this.generateLengthCode(length);

		return mysqlType + lengthCode;

	}

	private generateLengthCode(length: number[]): string {

		if (length.length === 0) {
			return '';
		}

		return `(${length.join(', ')})`;

	}

	private generateUniqueConstraintLine(outputTableName: string, outputColumnName: string) {
		return `CONSTRAINT \`${outputTableName}_${outputColumnName}_unique\` UNIQUE (\`${outputColumnName}\`)`;
	}

}
