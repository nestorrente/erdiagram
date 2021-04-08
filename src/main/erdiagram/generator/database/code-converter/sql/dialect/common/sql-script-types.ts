export interface TableCreationStatements {
	createTableStatement: string;
	alterTableStatements: string;
}

export interface CreateTableLines {
	sequences: string[];
	columns: string[];
	fkConstraints: string[];
	otherConstraints: string[];
}

export interface IdColumnCode {
	createSequenceLine?: string;
	columnLine: string;
	pkConstraintLine: string;
}

export interface RegularColumnCode {
	columnLine: string;
	uniqueConstraintLine?: string;
}

export interface ForeignKeyColumnCode extends RegularColumnCode {
	fkConstraintLine: string;
}
