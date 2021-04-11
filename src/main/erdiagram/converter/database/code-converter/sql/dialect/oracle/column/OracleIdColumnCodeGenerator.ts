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

	public generateIdColumnCode(outputTableName: string, identityColumnName: string): IdColumnCode {

		const outputIdentityColumnName = this.columnNameCaseConverter.convertCase(identityColumnName);

		const sequenceName = this.getSequenceName(outputTableName);

		return {
			createSequenceLine: this.generateCreateSequenceLine(sequenceName),
			columnLine: this.generateIdColumnDeclarationLine(outputIdentityColumnName, sequenceName),
			pkConstraintLine: this.createPrimaryKeyConstraint(outputTableName, outputIdentityColumnName)
		};

	}

	private getSequenceName(outputTableName: string): string {
		return `${outputTableName}_SEQ`;
	}

	private generateCreateSequenceLine(sequenceName: string): string {
		return `CREATE SEQUENCE "${sequenceName}" START WITH 1;`;
	}

	private generateIdColumnDeclarationLine(outputIdentityColumnName: string, sequenceName: string): string {
		const sqlType = this.typeResolver.resolveSqlType(EntityPropertyType.IDENTITY);
		return `"${outputIdentityColumnName}" ${sqlType} NOT NULL DEFAULT "${sequenceName}".nextval`;
	}

	private createPrimaryKeyConstraint(outputTableName: string, outputIdentityColumnName: string) {
		return `CONSTRAINT "${outputTableName}_PK" PRIMARY KEY ("${outputIdentityColumnName}")`;
	}

}
