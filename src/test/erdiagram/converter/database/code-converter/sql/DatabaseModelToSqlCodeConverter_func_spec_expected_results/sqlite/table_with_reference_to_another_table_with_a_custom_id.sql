PRAGMA foreign_keys = OFF;

CREATE TABLE "test_table_1" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "table_2_id" INTEGER NOT NULL,
    CONSTRAINT "test_table_1_table_2_id_fk" FOREIGN KEY ("table_2_id") REFERENCES "test_table_2" ("custom_id")
);

CREATE TABLE "test_table_2" (
    "custom_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

PRAGMA foreign_keys = ON;