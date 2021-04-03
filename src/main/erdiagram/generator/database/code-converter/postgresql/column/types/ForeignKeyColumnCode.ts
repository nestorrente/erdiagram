import RegularColumnCode from '@/erdiagram/generator/database/code-converter/postgresql/column/types/RegularColumnCode';

export default interface ForeignKeyColumnCode extends RegularColumnCode {
	fkConstraintLine: string;
}
