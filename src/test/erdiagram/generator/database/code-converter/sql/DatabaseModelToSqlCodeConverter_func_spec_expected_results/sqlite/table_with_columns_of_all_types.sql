PRAGMA foreign_keys = OFF;

CREATE TABLE "test_table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "boolean_column" INTEGER NOT NULL,
    "short_column" INTEGER NOT NULL,
    "int_column" INTEGER NOT NULL,
    "long_column" INTEGER NOT NULL,
    "decimal_column" REAL(10, 3) NOT NULL,
    "text_column" TEXT(50) NOT NULL,
    "date_column" INTEGER NOT NULL,
    "time_column" INTEGER NOT NULL,
    "datetime_column" INTEGER NOT NULL,
    "blob_column" BLOB NOT NULL
);

PRAGMA foreign_keys = ON;