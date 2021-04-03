import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import {TableColumnDescriptor} from '@/erdiagram/generator/database/model/database-model-types';
import RegularColumnCode from '@/erdiagram/generator/database/code-converter/sqlserver/column/types/RegularColumnCode';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import SqlTypeResolver from '@/erdiagram/generator/database/code-converter/common/SqlTypeResolver';

export default class SqlServerColumnCodeGenerator {

	constructor(
			private readonly typeResolver: SqlTypeResolver,
			private readonly columnNameCaseConverter: CaseConverter
	) {

	}

	// FIXME refactor the way "identity" flag is used
	public generateColumnCode(outputTableName: string, column: TableColumnDescriptor, identity: boolean = false): RegularColumnCode {

		const outputColumnName = this.columnNameCaseConverter.convertCase(column.name);
		const autoincrementalSequenceName = this.getAutoincrementalSequenceName(outputTableName, outputColumnName);

		return {
			createSequenceLine: column.autoincremental ? this.generateCreateSequenceLine(autoincrementalSequenceName) : undefined,
			columnLine: this.generateColumnDeclarationLine(outputColumnName, column, identity, autoincrementalSequenceName),
			uniqueConstraintLine: column.unique ? this.generateUniqueConstraintLine(outputTableName, outputColumnName) : undefined
		};

	}

	private getAutoincrementalSequenceName(outputTableName: string, outputColumnName: string): string {
		return `${outputTableName}_${outputColumnName}_seq`;
	}

	private generateCreateSequenceLine(autoincrementalSequenceName: string): string {
		return `CREATE SEQUENCE "${autoincrementalSequenceName}" START WITH 1;`;
	}

	// FIXME refactor this methods - it receives too much arguments
	private generateColumnDeclarationLine(outputColumnName: string, column: TableColumnDescriptor, identity: boolean, autoincrementalSequenceName: string): string {

		const {
			notNull,
			autoincremental,
			type,
			length
		} = column;

		const lineParts: string[] = [
			`"${outputColumnName}"`,
			this.generateSqlServerTypeDeclaration(type, length)
		];

		if (notNull) {
			lineParts.push('NOT NULL');
		}

		if (identity) {
			lineParts.push('IDENTITY(1, 1)');
		}

		if (autoincremental) {
			lineParts.push(`DEFAULT NEXT VALUE FOR "${autoincrementalSequenceName}"`);
		}

		return lineParts.join(' ');

	}

	private generateSqlServerTypeDeclaration(type: EntityPropertyType, length: number[]) {

		const sqlServerType = this.typeResolver.resolveSqlType(type);
		const lengthCode = this.generateLengthCode(length);

		return sqlServerType + lengthCode;

	}

	private generateLengthCode(length: number[]): string {

		if (length.length === 0) {
			return '';
		}

		return `(${length.join(', ')})`;

	}

	private generateUniqueConstraintLine(outputTableName: string, outputColumnName: string) {
		return `CONSTRAINT "${outputTableName}_${outputColumnName}_unique" UNIQUE ("${outputColumnName}")`;
	}

}
