import SqlDialectConfig
	from '@/erdiagram/converter/database/source-code-generator/sql/dialect/common/config/SqlDialectConfig';
import {WithPartial} from '@/erdiagram/util/types';

export default interface SqlServerDialectConfig extends SqlDialectConfig {

}

export type PartialSqlServerDialectConfig = Partial<WithPartial<SqlServerDialectConfig, 'typeBindings'>>;
