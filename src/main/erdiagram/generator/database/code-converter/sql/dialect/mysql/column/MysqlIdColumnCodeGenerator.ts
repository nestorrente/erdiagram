import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';
import {IdColumnCode} from '@/erdiagram/generator/database/code-converter/sql/dialect/common/sql-script-types';
import SqlIdColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/sql/dialect/common/column/SqlIdColumnCodeGenerator';
import SqlTypeResolver from '@/erdiagram/generator/database/code-converter/sql/dialect/common/SqlTypeResolver';

export default class MysqlIdColumnCodeGenerator implements SqlIdColumnCodeGenerator {

	constructor(
			private readonly typeResolver: SqlTypeResolver,
			private readonly columnNameCaseConverter: CaseConverter
	) {

	}

	public generateIdColumnCode(outputTableName: string, identifierColumnName: string): IdColumnCode {

		const outputIdentifierColumnName = this.columnNameCaseConverter.convertCase(identifierColumnName);

		return {
			columnLine: this.generateIdColumnDeclarationLine(outputIdentifierColumnName),
			pkConstraintLine: this.createPrimaryKeyConstraint(outputTableName, outputIdentifierColumnName)
		};

	}

	private generateIdColumnDeclarationLine(outputIdentifierColumnName: string): string {
		const sqlType = this.typeResolver.resolveSqlType(EntityPropertyType.IDENTIFIER);
		return `\`${outputIdentifierColumnName}\` ${sqlType} NOT NULL AUTO_INCREMENT`;
	}

	private createPrimaryKeyConstraint(outputTableName: string, outputIdentifierColumnName: string) {
		return `CONSTRAINT \`${outputTableName}_pk\` PRIMARY KEY (\`${outputIdentifierColumnName}\`)`;
	}

}
