CREATE SEQUENCE "test_table_autoincremental_column_seq" START WITH 1;
CREATE TABLE "test_table" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "not_null_column" INTEGER NOT NULL,
    "unique_column" INTEGER,
    "autoincremental_column" INTEGER DEFAULT nextval('"test_table_autoincremental_column_seq"'),
    CONSTRAINT "test_table_pk" PRIMARY KEY ("id"),
    CONSTRAINT "test_table_unique_column_unique" UNIQUE ("unique_column")
);