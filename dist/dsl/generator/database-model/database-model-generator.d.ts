import { EntityRelationshipModel } from '../../parser/er-model-parser';
import { DatabaseModel } from './database-model-types';
export interface DatabaseModelGenerator {
    generateDatabaseModel(model: EntityRelationshipModel): DatabaseModel;
}
declare const databaseModelGenerator: DatabaseModelGenerator;
export default databaseModelGenerator;
//# sourceMappingURL=database-model-generator.d.ts.map