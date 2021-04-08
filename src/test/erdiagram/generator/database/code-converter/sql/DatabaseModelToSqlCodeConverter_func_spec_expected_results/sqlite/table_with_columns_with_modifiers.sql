CREATE TABLE "test_table" (
    "id" INTEGER NOT NULL,
    "not_null_column" INTEGER NOT NULL,
    "unique_column" INTEGER,
    CONSTRAINT "test_table_pk" PRIMARY KEY ("id"),
    CONSTRAINT "test_table_unique_column_unique" UNIQUE ("unique_column")
);