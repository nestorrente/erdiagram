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
    leftEntity: string;
    leftEntityAlias: string;
    leftCardinality: Cardinality;
    rightEntityAlias: string;
    rightEntity: string;
    rightCardinality: Cardinality;
    direction: Direction;
    relationShipName: string;
}
export interface EntityDescriptor {
    name: string;
    properties: EntityPropertyDescriptor[];
}
export interface EntityPropertyDescriptor {
    name: string;
    optional: boolean;
    type: string;
    length?: number;
}
export declare function parseEntityNameStatement(line: string): string | null;
export declare function parseEntityPropertyStatement(line: string): EntityPropertyDescriptor | null;
export declare function parseRelationshipStatement(line: string): RelationshipDescriptor | null;
//# sourceMappingURL=statement-types-parse-functions.d.ts.map