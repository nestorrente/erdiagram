import RegularColumnCode from '@/dsl/generator/database/sql/mysql/column/types/RegularColumnCode';

export default interface ForeignKeyColumnCode extends RegularColumnCode {
	fkConstraintLine: string;
}
