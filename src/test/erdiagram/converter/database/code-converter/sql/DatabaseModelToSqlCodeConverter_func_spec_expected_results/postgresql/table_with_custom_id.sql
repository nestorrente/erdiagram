CREATE TABLE "test_table" (
    "the_custom_identifier_of_test_table" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    CONSTRAINT "test_table_pk" PRIMARY KEY ("the_custom_identifier_of_test_table")
);