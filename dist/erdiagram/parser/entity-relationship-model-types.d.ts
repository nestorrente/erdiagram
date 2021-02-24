export interface EntityRelationshipModel {
    entities: EntityDescriptor[];
    relationships: RelationshipDescriptor[];
}
export declare enum Cardinality {
    MANY = "many",
    ONE = "one",
    ZERO_OR_ONE = "zero_or_one"
}
export declare enum Direction {
    LEFT_TO_RIGHT = "left_to_right",
    RIGHT_TO_LEFT = "right_to_left",
    BIDIRECTIONAL = "bidirectional"
}
export interface RelationshipDescriptor {
    leftMember: RelationshipMember;
    rightMember: RelationshipMember;
    direction: Direction;
    relationShipName?: string;
}
export interface RelationshipMember {
    entity: string;
    entityAlias: string;
    cardinality: Cardinality;
}
export interface EntityDescriptor {
    name: string;
    properties: EntityPropertyDescriptor[];
}
export interface EntityPropertyDescriptor {
    name: string;
    optional: boolean;
    autoincremental: boolean;
    unique: boolean;
    type: EntityPropertyType;
    length: number[];
}
export declare enum EntityPropertyType {
    BOOLEAN = "bool",
    SHORT = "short",
    INT = "int",
    LONG = "long",
    DECIMAL = "decimal",
    TEXT = "text",
    DATE = "date",
    TIME = "time",
    DATETIME = "datetime",
    BLOB = "blob"
}
//# sourceMappingURL=entity-relationship-model-types.d.ts.map