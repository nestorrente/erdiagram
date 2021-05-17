import SqlDialectConfig from '@/erdiagram/converter/database/code-converter/sql/dialect/common/config/SqlDialectConfig';
import {WithPartial} from '@/erdiagram/util/types';

export default interface SqliteDialectConfig extends SqlDialectConfig {

}

export type PartialSqliteDialectConfig = Partial<WithPartial<SqliteDialectConfig, 'typeBindings'>>;
