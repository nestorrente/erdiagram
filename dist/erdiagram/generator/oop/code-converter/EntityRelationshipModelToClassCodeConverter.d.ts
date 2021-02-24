import EntityRelationshipModelToCodeConverter from '../../EntityRelationshipModelToCodeConverter';
import ClassModelToCodeConverter from './ClassModelToCodeConverter';
import { EntityRelationshipModel } from '../../../parser/entity-relationship-model-types';
import ClassModelGenerator from '../model/ClassModelGenerator';
export default class EntityRelationshipModelToClassCodeConverter implements EntityRelationshipModelToCodeConverter {
    private readonly classModelGenerator;
    private readonly classModelToCodeConverter;
    constructor(classModelGenerator: ClassModelGenerator, classModelToCodeConverter: ClassModelToCodeConverter);
    generateCode(entityRelationshipModel: EntityRelationshipModel): string;
}
//# sourceMappingURL=EntityRelationshipModelToClassCodeConverter.d.ts.map