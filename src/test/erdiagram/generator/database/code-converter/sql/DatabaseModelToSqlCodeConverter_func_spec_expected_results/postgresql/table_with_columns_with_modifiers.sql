CREATE TABLE "test_table" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "not_null_column" INTEGER NOT NULL,
    "unique_column" INTEGER,
    CONSTRAINT "test_table_pk" PRIMARY KEY ("id"),
    CONSTRAINT "test_table_unique_column_unique" UNIQUE ("unique_column")
);