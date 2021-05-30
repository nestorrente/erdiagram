import SqlDialectConfig
	from '@/erdiagram/converter/database/source-code-generator/sql/dialect/common/config/SqlDialectConfig';
import {WithPartial} from '@/erdiagram/util/types';

export default interface PostgresqlDialectConfig extends SqlDialectConfig {

}

export type PartialPostgresqlDialectConfig = Partial<WithPartial<PostgresqlDialectConfig, 'typeBindings'>>;
