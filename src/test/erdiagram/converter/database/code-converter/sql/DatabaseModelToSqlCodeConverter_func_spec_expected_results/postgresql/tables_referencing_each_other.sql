CREATE TABLE "test_table_1" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "table_2_id" BIGINT NOT NULL,
    CONSTRAINT "test_table_1_pk" PRIMARY KEY ("id")
);

CREATE TABLE "test_table_2" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "table_1_id" BIGINT NOT NULL,
    CONSTRAINT "test_table_2_pk" PRIMARY KEY ("id")
);

ALTER TABLE "test_table_1" ADD CONSTRAINT "test_table_1_table_2_id_fk" FOREIGN KEY ("table_2_id") REFERENCES "test_table_2" ("id");

ALTER TABLE "test_table_2" ADD CONSTRAINT "test_table_2_table_1_id_fk" FOREIGN KEY ("table_1_id") REFERENCES "test_table_1" ("id");