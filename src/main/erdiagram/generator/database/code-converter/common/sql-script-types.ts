export interface TableCreationStatements {
	createTableStatement: string;
	alterTableStatements: string;
}

export interface CreateTableLines {
	columns: string[];
	fkConstraints: string[];
	otherConstraints: string[];
}

export interface CreateTableLinesWithSequences extends CreateTableLines {
	sequences: string[];
}
