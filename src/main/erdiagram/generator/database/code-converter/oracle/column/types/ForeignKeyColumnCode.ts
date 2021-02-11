import RegularColumnCode from '@/erdiagram/generator/database/code-converter/oracle/column/types/RegularColumnCode';

export default interface ForeignKeyColumnCode extends RegularColumnCode {
	fkConstraintLine: string;
}
