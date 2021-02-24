import { EntityPropertyType } from '../../../parser/entity-relationship-model-types';
export interface ClassModel {
    classes: ClassDescriptor[];
}
export interface ClassDescriptor {
    name: string;
    fields: NonEntityFieldDescriptor[];
}
export interface NonEntityFieldDescriptor {
    name: string;
    nullable: boolean;
    list: boolean;
    primitiveType?: EntityPropertyType;
    entityType?: string;
}
export interface EntityFieldDescriptor {
    name: string;
    nullable: boolean;
    list: boolean;
    type?: string;
}
//# sourceMappingURL=class-model-types.d.ts.map