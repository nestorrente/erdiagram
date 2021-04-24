CREATE TABLE "test_table" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "nullable_column" INTEGER,
    "unique_column" INTEGER NOT NULL,
    CONSTRAINT "test_table_pk" PRIMARY KEY ("id"),
    CONSTRAINT "test_table_unique_column_unique" UNIQUE ("unique_column")
);