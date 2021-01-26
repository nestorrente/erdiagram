import { EntityPropertyType } from '../../../parser/statement/statement-types-parse-functions';
export interface ClassModel {
    classes: ClassDescriptor[];
}
export interface ClassDescriptor {
    name: string;
    fields: FieldDescriptor[];
}
export interface FieldDescriptor {
    name: string;
    nullable: boolean;
    list: boolean;
    primitiveType?: EntityPropertyType;
    entityType?: string;
}
//# sourceMappingURL=class-model-types.d.ts.map