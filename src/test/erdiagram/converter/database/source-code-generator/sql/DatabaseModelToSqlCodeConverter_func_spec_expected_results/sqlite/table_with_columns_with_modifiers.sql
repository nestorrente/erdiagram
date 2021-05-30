PRAGMA foreign_keys = OFF;

CREATE TABLE "test_table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nullable_column" INTEGER,
    "unique_column" INTEGER NOT NULL,
    CONSTRAINT "test_table_unique_column_unique" UNIQUE ("unique_column")
);

PRAGMA foreign_keys = ON;