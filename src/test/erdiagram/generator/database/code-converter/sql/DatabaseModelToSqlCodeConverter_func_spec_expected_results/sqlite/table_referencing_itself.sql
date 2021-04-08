PRAGMA foreign_keys = OFF;

CREATE TABLE "test_table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "self_reference_id" INTEGER NOT NULL,
    CONSTRAINT "test_table_self_reference_id_fk" FOREIGN KEY ("self_reference_id") REFERENCES "test_table" ("id")
);

PRAGMA foreign_keys = ON;