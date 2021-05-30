import SqlDialectConfig
	from '@/erdiagram/converter/database/source-code-generator/sql/dialect/common/config/SqlDialectConfig';
import {WithPartial} from '@/erdiagram/util/types';

export default interface OracleDialectConfig extends SqlDialectConfig {

}

export type PartialOracleDialectConfig = Partial<WithPartial<OracleDialectConfig, 'typeBindings'>>;
