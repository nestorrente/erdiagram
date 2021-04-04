import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {TableColumnDescriptor} from '@/erdiagram/generator/database/model/database-model-types';
import RegularColumnCode from '@/erdiagram/generator/database/code-converter/postgresql/column/types/RegularColumnCode';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import SqlTypeResolver from '@/erdiagram/generator/database/code-converter/common/SqlTypeResolver';

export default class PostgresqlColumnCodeGenerator {

	constructor(
			private readonly typeResolver: SqlTypeResolver,
			private readonly columnNameCaseConverter: CaseConverter
	) {

	}

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
			this.generatePostgresqlTypeDeclaration(type, length)
		];

		if (notNull) {
			lineParts.push('NOT NULL');
		}

		if (identity) {
			lineParts.push('GENERATED ALWAYS AS IDENTITY');
		}

		if (autoincremental) {
			lineParts.push(`DEFAULT nextval('"${autoincrementalSequenceName}"')`);
		}

		return lineParts.join(' ');

	}

	private generatePostgresqlTypeDeclaration(type: EntityPropertyType, length: number[]) {

		const postgresqlType = this.typeResolver.resolveSqlType(type);
		const lengthCode = this.generateLengthCode(length);

		return postgresqlType + lengthCode;

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