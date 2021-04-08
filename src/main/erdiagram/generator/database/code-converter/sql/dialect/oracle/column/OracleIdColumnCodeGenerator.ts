import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import {IdColumnCode} from '@/erdiagram/generator/database/code-converter/sql/dialect/common/sql-script-types';
import SqlIdColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sql/dialect/common/column/SqlIdColumnCodeGenerator';
import SqlTypeResolver from '@/erdiagram/generator/database/code-converter/sql/dialect/common/SqlTypeResolver';

export default class OracleIdColumnCodeGenerator implements SqlIdColumnCodeGenerator {

	constructor(
			private readonly typeResolver: SqlTypeResolver,
			private readonly columnNameCaseConverter: CaseConverter
	) {

	}

	public generateIdColumnCode(outputTableName: string, identifierColumnName: string): IdColumnCode {

		const outputIdentifierColumnName = this.columnNameCaseConverter.convertCase(identifierColumnName);

		const sequenceName = this.getSequenceName(outputTableName, outputIdentifierColumnName);

		return {
			createSequenceLine: this.generateCreateSequenceLine(sequenceName),
			columnLine: this.generateIdColumnDeclarationLine(outputIdentifierColumnName, sequenceName),
			pkConstraintLine: this.createPrimaryKeyConstraint(outputTableName, outputIdentifierColumnName)
		};

	}

	private getSequenceName(outputTableName: string, outputColumnName: string): string {
		return `${outputTableName}_${outputColumnName}_SEQ`;
	}

	private generateCreateSequenceLine(sequenceName: string): string {
		return `CREATE SEQUENCE "${sequenceName}" START WITH 1;`;
	}

	private generateIdColumnDeclarationLine(outputIdentifierColumnName: string, sequenceName: string): string {
		const sqlType = this.typeResolver.resolveSqlType(EntityPropertyType.IDENTIFIER);
		return `"${outputIdentifierColumnName}" ${sqlType} NOT NULL DEFAULT "${sequenceName}".nextval`;
	}

	private createPrimaryKeyConstraint(outputTableName: string, outputIdentifierColumnName: string) {
		return `CONSTRAINT "${outputTableName}_PK" PRIMARY KEY ("${outputIdentifierColumnName}")`;
	}

}
