PRAGMA foreign_keys = OFF;

CREATE TABLE "test_table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "not_null_column" INTEGER NOT NULL,
    "unique_column" INTEGER,
    CONSTRAINT "test_table_unique_column_unique" UNIQUE ("unique_column")
);

PRAGMA foreign_keys = ON;