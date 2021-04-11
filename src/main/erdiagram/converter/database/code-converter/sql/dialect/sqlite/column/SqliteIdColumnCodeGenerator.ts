import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import {IdColumnCode} from '@/erdiagram/converter/database/code-converter/sql/dialect/common/sql-script-types';
import SqlIdColumnCodeGenerator
	from '@/erdiagram/converter/database/code-converter/sql/dialect/common/column/SqlIdColumnCodeGenerator';
import SqlTypeResolver from '@/erdiagram/converter/database/code-converter/sql/dialect/common/SqlTypeResolver';

export default class SqliteIdColumnCodeGenerator implements SqlIdColumnCodeGenerator {

	constructor(
			private readonly typeResolver: SqlTypeResolver,
			private readonly columnNameCaseConverter: CaseConverter
	) {

	}

	public generateIdColumnCode(outputTableName: string, identityColumnName: string): IdColumnCode {

		const outputIdentityColumnName = this.columnNameCaseConverter.convertCase(identityColumnName);

		return {
			columnLine: this.generateIdColumnDeclarationLine(outputIdentityColumnName)
		};

	}

	private generateIdColumnDeclarationLine(outputIdentityColumnName: string): string {
		const sqlType = this.typeResolver.resolveSqlType(EntityPropertyType.IDENTITY);
		return `"${outputIdentityColumnName}" ${sqlType} NOT NULL PRIMARY KEY AUTOINCREMENT`;
	}

}
