import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {TableColumnDescriptor} from '@/erdiagram/generator/database/model/database-model-types';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import SqlTypeResolver from '@/erdiagram/generator/database/code-converter/sql/dialect/common/SqlTypeResolver';
import {RegularColumnCode} from '@/erdiagram/generator/database/code-converter/sql/dialect/common/sql-script-types';
import SqlColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sql/dialect/common/column/SqlColumnCodeGenerator';

export default class MysqlColumnCodeGenerator implements SqlColumnCodeGenerator {

	constructor(
			private readonly typeResolver: SqlTypeResolver,
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

		return lineParts.join(' ');

	}

	private generateMysqlTypeDeclaration(type: EntityPropertyType, length: number[]) {

		const mysqlType = this.typeResolver.resolveSqlType(type);
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
