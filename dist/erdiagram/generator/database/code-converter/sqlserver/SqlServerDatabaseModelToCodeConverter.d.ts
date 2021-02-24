import { DatabaseModel } from '../../model/database-model-types';
import SqlServerDatabaseModelToCodeConverterConfig from './config/SqlServerDatabaseModelToCodeConverterConfig';
import DatabaseModelToCodeConverter from '../DatabaseModelToCodeConverter';
export default class SqlServerDatabaseModelToCodeConverter implements DatabaseModelToCodeConverter {
    private readonly config;
    private readonly tableNameCaseConverter;
    private readonly columnCodeGenerator;
    private readonly idColumnCodeGenerator;
    private readonly foreignColumnCodeGenerator;
    constructor(config?: Partial<SqlServerDatabaseModelToCodeConverterConfig>);
    generateCode(databaseModel: DatabaseModel): string;
    private generateTableCode;
    private processReferences;
    private processColumns;
}
//# sourceMappingURL=SqlServerDatabaseModelToCodeConverter.d.ts.map