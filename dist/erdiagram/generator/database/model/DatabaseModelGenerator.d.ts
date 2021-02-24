import { DatabaseModel } from './database-model-types';
import DatabaseModelGeneratorConfig from './config/DatabaseModelGeneratorConfig';
import { EntityRelationshipModel } from '../../../parser/entity-relationship-model-types';
export default class DatabaseModelGenerator {
    private readonly config;
    constructor(config?: Partial<DatabaseModelGeneratorConfig>);
    generateDatabaseModel(model: EntityRelationshipModel): DatabaseModel;
    private generateEntityTable;
    private generateRelationshipTable;
    private getRelationshipTableName;
    private getRelationshipTableIdentifierColumnName;
    private createTableReference;
    private pluralizeEntityNameIfApplies;
    private getIdentifierColumnName;
    private mapPropertyToColumn;
    private isManyToManyRelationship;
}
//# sourceMappingURL=DatabaseModelGenerator.d.ts.map