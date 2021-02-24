import DatabaseModelGenerator from '../model/DatabaseModelGenerator';
import DatabaseModelToCodeConverter from './DatabaseModelToCodeConverter';
import EntityRelationshipModelToCodeConverter from '../../EntityRelationshipModelToCodeConverter';
import { EntityRelationshipModel } from '../../../parser/entity-relationship-model-types';
export default class EntityRelationshipModelToDatabaseCodeConverter implements EntityRelationshipModelToCodeConverter {
    private readonly databaseModelGenerator;
    private readonly databaseModelToCodeConverter;
    constructor(databaseModelGenerator: DatabaseModelGenerator, databaseModelToCodeConverter: DatabaseModelToCodeConverter);
    generateCode(entityRelationshipModel: EntityRelationshipModel): string;
}
//# sourceMappingURL=EntityRelationshipModelToDatabaseCodeConverter.d.ts.map