import SqlDialectConfig
	from '@/erdiagram/converter/database/source-code-generator/sql/dialect/common/config/SqlDialectConfig';
import {WithPartial} from '@/erdiagram/util/types';

export default interface MysqlDialectConfig extends SqlDialectConfig {

}

export type PartialMysqlDialectConfig = Partial<WithPartial<MysqlDialectConfig, 'typeBindings'>>;
