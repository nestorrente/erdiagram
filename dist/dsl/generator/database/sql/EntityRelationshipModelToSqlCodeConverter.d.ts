import { EntityRelationshipModel } from '@/dsl/parser/er-model-parser';
import DatabaseModelToCodeConverter from '@/dsl/generator/database/sql/DatabaseModelToCodeConverter';
import EntityRelationshipModelToCodeConverter from '@/dsl/generator/entity-relationship-to-code-converter';
export default class EntityRelationshipModelToSqlCodeConverter implements EntityRelationshipModelToCodeConverter {
    private readonly databaseModelToCodeConverter;
    constructor(databaseModelToCodeConverter: DatabaseModelToCodeConverter);
    generateCode(entityRelationshipModel: EntityRelationshipModel): string;
}
//# sourceMappingURL=EntityRelationshipModelToSqlCodeConverter.d.ts.map