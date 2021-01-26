export declare enum StatementType {
    ENTITY_NAME = "entityName",
    ENTITY_PROPERTY = "entityProperty",
    RELATIONSHIP = "relationship",
    BLANK_LINE = "blankLine",
    UNKNOWN = "unknown"
}
export declare function guessStatementType(line: string): StatementType;
//# sourceMappingURL=statement-type-guesser.d.ts.map