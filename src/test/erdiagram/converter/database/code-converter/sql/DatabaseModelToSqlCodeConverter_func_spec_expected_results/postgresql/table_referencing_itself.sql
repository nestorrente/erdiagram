CREATE TABLE "test_table" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "self_reference_id" BIGINT NOT NULL,
    CONSTRAINT "test_table_pk" PRIMARY KEY ("id")
);

ALTER TABLE "test_table" ADD CONSTRAINT "test_table_self_reference_id_fk" FOREIGN KEY ("self_reference_id") REFERENCES "test_table" ("id");