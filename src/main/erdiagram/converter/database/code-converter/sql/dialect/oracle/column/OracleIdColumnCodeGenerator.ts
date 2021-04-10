import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import {IdColumnCode} from '@/erdiagram/converter/database/code-converter/sql/dialect/common/sql-script-types';
import SqlIdColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/common/column/SqlIdColumnCodeGenerator';
import SqlTypeResolver from '@/erdiagram/converter/database/code-converter/sql/dialect/common/SqlTypeResolver';

export default class OracleIdColumnCodeGenerator implements SqlIdColumnCodeGenerator {

	constructor(
			private readonly typeResolver: SqlTypeResolver,
			private readonly columnNameCaseConverter: CaseConverter
	) {

	}

	public generateIdColumnCode(outputTableName: string, identifierColumnName: string): IdColumnCode {

		const outputIdentifierColumnName = this.columnNameCaseConverter.convertCase(identifierColumnName);

		const sequenceName = this.getSequenceName(outputTableName);

		return {
			createSequenceLine: this.generateCreateSequenceLine(sequenceName),
			columnLine: this.generateIdColumnDeclarationLine(outputIdentifierColumnName, sequenceName),
			pkConstraintLine: this.createPrimaryKeyConstraint(outputTableName, outputIdentifierColumnName)
		};

	}

	private getSequenceName(outputTableName: string): string {
		return `${outputTableName}_SEQ`;
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
