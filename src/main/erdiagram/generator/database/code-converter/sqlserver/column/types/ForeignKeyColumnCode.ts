import RegularColumnCode from '@/erdiagram/generator/database/code-converter/sqlserver/column/types/RegularColumnCode';

export default interface ForeignKeyColumnCode extends RegularColumnCode {
	fkConstraintLine: string;
}
