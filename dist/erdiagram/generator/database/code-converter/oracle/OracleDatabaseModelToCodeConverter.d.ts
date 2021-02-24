import { DatabaseModel } from '../../model/database-model-types';
import OracleDatabaseModelToCodeConverterConfig from './config/OracleDatabaseModelToCodeConverterConfig';
import DatabaseModelToCodeConverter from '../DatabaseModelToCodeConverter';
export default class OracleDatabaseModelToCodeConverter implements DatabaseModelToCodeConverter {
    private readonly config;
    private readonly tableNameCaseConverter;
    private readonly columnCodeGenerator;
    private readonly idColumnCodeGenerator;
    private readonly foreignColumnCodeGenerator;
    constructor(config?: Partial<OracleDatabaseModelToCodeConverterConfig>);
    generateCode(databaseModel: DatabaseModel): string;
    private generateTableCode;
    private processReferences;
    private processColumns;
}
//# sourceMappingURL=OracleDatabaseModelToCodeConverter.d.ts.map