PRAGMA foreign_keys = OFF;

CREATE TABLE "test_table" (
    "the_custom_identity_of_test_table" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

PRAGMA foreign_keys = ON;