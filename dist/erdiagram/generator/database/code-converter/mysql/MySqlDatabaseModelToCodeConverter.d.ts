import { DatabaseModel } from '../../model/database-model-types';
import MySqlDatabaseModelToCodeConverterConfig from './config/MySqlDatabaseModelToCodeConverterConfig';
import DatabaseModelToCodeConverter from '../DatabaseModelToCodeConverter';
export default class MySqlDatabaseModelToCodeConverter implements DatabaseModelToCodeConverter {
    private readonly config;
    private readonly tableNameCaseConverter;
    private readonly columnCodeGenerator;
    private readonly idColumnCodeGenerator;
    private readonly foreignColumnCodeGenerator;
    constructor(config?: Partial<MySqlDatabaseModelToCodeConverterConfig>);
    generateCode(databaseModel: DatabaseModel): string;
    private generateTableCode;
    private processReferences;
    private processColumns;
}
//# sourceMappingURL=MySqlDatabaseModelToCodeConverter.d.ts.map