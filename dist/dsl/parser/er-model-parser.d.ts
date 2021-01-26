import { EntityDescriptor, RelationshipDescriptor } from './statement/statement-types-parse-functions';
export interface EntityRelationshipModel {
    entities: EntityDescriptor[];
    relationships: RelationshipDescriptor[];
}
export declare function parseEntityRelationshipModel(code: string): EntityRelationshipModel;
//# sourceMappingURL=er-model-parser.d.ts.map