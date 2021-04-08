CREATE TABLE "test_table" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "boolean_column" BOOLEAN NOT NULL,
    "short_column" SMALLINT NOT NULL,
    "int_column" INTEGER NOT NULL,
    "long_column" BIGINT NOT NULL,
    "decimal_column" DECIMAL(10, 3) NOT NULL,
    "text_column" VARCHAR(50) NOT NULL,
    "date_column" DATE NOT NULL,
    "time_column" TIME NOT NULL,
    "datetime_column" TIMESTAMP NOT NULL,
    "blob_column" BYTEA NOT NULL,
    CONSTRAINT "test_table_pk" PRIMARY KEY ("id")
);