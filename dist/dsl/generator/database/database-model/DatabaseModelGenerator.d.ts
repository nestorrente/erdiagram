import { EntityRelationshipModel } from '@/dsl/parser/er-model-parser';
import { DatabaseModel } from '@/dsl/generator/database/database-model/database-model-types';
import DatabaseModelGeneratorConfig from '@/dsl/generator/database/database-model/DatabaseModelGeneratorConfig';
export declare class DatabaseModelGenerator {
    private readonly config;
    constructor(config?: Partial<DatabaseModelGeneratorConfig>);
    generateDatabaseModel(model: EntityRelationshipModel): DatabaseModel;
}
declare const databaseModelGenerator: DatabaseModelGenerator;
export default databaseModelGenerator;
//# sourceMappingURL=DatabaseModelGenerator.d.ts.map