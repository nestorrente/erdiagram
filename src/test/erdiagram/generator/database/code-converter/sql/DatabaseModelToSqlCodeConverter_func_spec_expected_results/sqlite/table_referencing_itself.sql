CREATE TABLE "test_table" (
    "id" INTEGER NOT NULL,
    "self_reference_id" INTEGER NOT NULL,
    CONSTRAINT "test_table_pk" PRIMARY KEY ("id")
);

ALTER TABLE "test_table" ADD CONSTRAINT "test_table_self_reference_id_fk" FOREIGN KEY ("self_reference_id") REFERENCES "test_table" ("id");