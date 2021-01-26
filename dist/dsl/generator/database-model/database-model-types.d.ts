import { EntityPropertyType } from '../../parser/statement/statement-types-parse-functions';
export interface DatabaseModel {
    tables: TableDescriptor[];
}
export interface TableDescriptor {
    name: string;
    id: string;
    columns: TableColumnDescriptor[];
    references: TableReferenceDescriptor[];
}
export interface TableColumnDescriptor {
    name: string;
    notNull: boolean;
    type: EntityPropertyType;
    length?: number;
}
export interface TableReferenceDescriptor {
    alias: string;
    columnName: string;
    targetTableName: string;
    notNull: boolean;
}
//# sourceMappingURL=database-model-types.d.ts.map