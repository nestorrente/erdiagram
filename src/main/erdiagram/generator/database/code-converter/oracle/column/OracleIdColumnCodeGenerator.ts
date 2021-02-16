import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import {TableColumnDescriptor} from '@/erdiagram/generator/database/model/database-model-types';
import IdColumnCode from '@/erdiagram/generator/database/code-converter/oracle/column/types/IdColumnCode';
import OracleColumnCodeGenerator
	from '@/erdiagram/generator/database/code-converter/oracle/column/OracleColumnCodeGenerator';
import CaseConverter from '@/erdiagram/generator/common/case-format/CaseConverter';

export default class OracleIdColumnCodeGenerator {

	constructor(
			private readonly columnCodeGenerator: OracleColumnCodeGenerator,
			private readonly columnNameCaseConverter: CaseConverter,
			private readonly idColumnType: EntityPropertyType
	) {

	}

	public generateIdColumnCode(outputTableName: string, identifierColumnName: string): IdColumnCode {

		const column = this.createIdColumnDescriptor(identifierColumnName);

		const {
			createSequenceLine,
			columnLine
		} = this.columnCodeGenerator.generateColumnCode(outputTableName, column);

		if (createSequenceLine == null) {
			throw new Error('Unexpected error: missing sequence for primary key column');
		}

		const pkConstraintLine = this.createPrimaryKeyConstraint(outputTableName, column);

		return {
			createSequenceLine,
			columnLine,
			pkConstraintLine
		};

	}

	private createIdColumnDescriptor(identifierColumnName: string): TableColumnDescriptor {
		return {
			name: identifierColumnName,
			type: this.idColumnType,
			length: [],
			notNull: true,
			// FIXME when different IDENTITY strategies are supported, we must
			//  change this to false and manage the IDENTITY generation manually.
			autoincremental: true,
			// As primary keys are unique by default, we don't
			// need to manually define an UNIQUE KEY constraint
			unique: false
		};
	}

	private createPrimaryKeyConstraint(outputTableName: string, column: TableColumnDescriptor) {
		const columnName = this.columnNameCaseConverter.convertCase(column.name);
		return `CONSTRAINT "${outputTableName}_PK" PRIMARY KEY ("${columnName}")`;
	}

}