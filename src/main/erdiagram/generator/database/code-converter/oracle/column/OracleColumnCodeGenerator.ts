import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {TableColumnDescriptor} from '@/erdiagram/generator/database/model/database-model-types';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import SqlTypeResolver from '@/erdiagram/generator/database/code-converter/common/SqlTypeResolver';
import {RegularColumnCode} from '@/erdiagram/generator/database/code-converter/common/sql-script-types';
import SqlColumnCodeGenerator from '@/erdiagram/generator/database/code-converter/common/column/SqlColumnCodeGenerator';

export default class OracleColumnCodeGenerator implements SqlColumnCodeGenerator {

	constructor(
			private readonly typeResolver: SqlTypeResolver,
			private readonly columnNameCaseConverter: CaseConverter
	) {

	}

	public generateColumnCode(outputTableName: string, column: TableColumnDescriptor): RegularColumnCode {

		const outputColumnName = this.columnNameCaseConverter.convertCase(column.name);
		const autoincrementalSequenceName = this.getAutoincrementalSequenceName(outputTableName, outputColumnName);

		return {
			createSequenceLine: column.autoincremental ? this.generateCreateSequenceLine(autoincrementalSequenceName) : undefined,
			columnLine: this.generateColumnDeclarationLine(outputColumnName, column, autoincrementalSequenceName),
			uniqueConstraintLine: column.unique ? this.generateUniqueConstraintLine(outputTableName, outputColumnName) : undefined
		};

	}

	private getAutoincrementalSequenceName(outputTableName: string, outputColumnName: string): string {
		return `${outputTableName}_${outputColumnName}_SEQ`;
	}

	private generateCreateSequenceLine(autoincrementalSequenceName: string): string {
		return `CREATE SEQUENCE "${autoincrementalSequenceName}" START WITH 1;`;
	}

	private generateColumnDeclarationLine(outputColumnName: string, column: TableColumnDescriptor, autoincrementalSequenceName: string): string {

		const {
			notNull,
			autoincremental,
			type,
			length
		} = column;

		const lineParts: string[] = [
			`"${outputColumnName}"`,
			this.generateOracleTypeDeclaration(type, length)
		];

		if (notNull) {
			lineParts.push('NOT NULL');
		}

		if (autoincremental) {
			lineParts.push(`DEFAULT "${autoincrementalSequenceName}".nextval`);
		}

		return lineParts.join(' ');

	}

	private generateOracleTypeDeclaration(type: EntityPropertyType, length: number[]) {

		const oracleType = this.typeResolver.resolveSqlType(type);
		const lengthCode = this.generateLengthCode(length);

		return oracleType + lengthCode;

	}

	private generateLengthCode(length: number[]): string {

		if (length.length === 0) {
			return '';
		}

		return `(${length.join(', ')})`;

	}

	private generateUniqueConstraintLine(outputTableName: string, outputColumnName: string) {
		return `CONSTRAINT "${outputTableName}_${outputColumnName}_UNIQUE" UNIQUE ("${outputColumnName}")`;
	}

}
