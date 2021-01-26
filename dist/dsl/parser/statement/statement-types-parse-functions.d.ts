export declare enum Cardinality {
    MANY = "many",
    ONE = "one"
}
export declare enum Direction {
    LEFT = "left",
    RIGHT = "right",
    BOTH = "both"
}
export interface BaseDescriptor {
    metadata: Metadata[];
}
export interface RelationshipDescriptor extends BaseDescriptor {
    leftMember: RelationshipMember;
    rightMember: RelationshipMember;
    direction: Direction;
    relationShipName: string;
}
export interface RelationshipMember {
    entity: string;
    entityAlias: string;
    cardinality: Cardinality;
    optional: boolean;
}
export interface EntityDescriptor extends BaseDescriptor {
    name: string;
    properties: EntityPropertyDescriptor[];
}
export interface EntityPropertyDescriptor extends BaseDescriptor {
    name: string;
    optional: boolean;
    type: EntityPropertyType;
    length?: number;
}
export declare enum EntityPropertyType {
    TEXT = "text",
    LONG = "long",
    INT = "int",
    DECIMAL = "decimal",
    BOOLEAN = "bool",
    DATE = "date",
    TIME = "time",
    DATETIME = "datetime"
}
export interface Metadata {
    key: string;
    value: string;
}
export declare function parseEntityNameStatement(line: string): string;
export declare function parseEntityPropertyStatement(line: string): EntityPropertyDescriptor;
export declare function parseRelationshipStatement(line: string): RelationshipDescriptor;
export declare function parseMetadataStatement(line: string): Metadata;
//# sourceMappingURL=statement-types-parse-functions.d.ts.map