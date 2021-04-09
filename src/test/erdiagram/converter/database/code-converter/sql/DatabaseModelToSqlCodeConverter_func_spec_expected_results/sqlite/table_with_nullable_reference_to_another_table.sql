PRAGMA foreign_keys = OFF;

CREATE TABLE "test_table_1" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "table_2_id" INTEGER,
    CONSTRAINT "test_table_1_table_2_id_fk" FOREIGN KEY ("table_2_id") REFERENCES "test_table_2" ("id")
);

CREATE TABLE "test_table_2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

PRAGMA foreign_keys = ON;