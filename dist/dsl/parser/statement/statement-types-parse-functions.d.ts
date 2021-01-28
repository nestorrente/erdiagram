export declare enum Cardinality {
    MANY = "many",
    ONE = "one"
}
export declare enum Direction {
    LEFT = "left",
    RIGHT = "right",
    BOTH = "both"
}
export interface RelationshipDescriptor {
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
    unique: boolean;
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
    length?: number;
}
export declare enum EntityPropertyType {
    TEXT = "text",
    LONG = "long",
    INT = "int",
    SHORT = "short",
    DECIMAL = "decimal",
    BOOLEAN = "bool",
    DATE = "date",
    TIME = "time",
    DATETIME = "datetime"
}
export declare function parseEntityNameStatement(line: string): string;
export declare function parseEntityPropertyStatement(line: string): EntityPropertyDescriptor;
export declare function parseRelationshipStatement(line: string): RelationshipDescriptor;
//# sourceMappingURL=statement-types-parse-functions.d.ts.map