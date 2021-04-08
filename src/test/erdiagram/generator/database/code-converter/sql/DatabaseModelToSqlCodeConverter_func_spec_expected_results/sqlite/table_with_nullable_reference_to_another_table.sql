CREATE TABLE "test_table_1" (
    "id" INTEGER NOT NULL,
    "table_2_id" INTEGER NOT NULL,
    CONSTRAINT "test_table_1_pk" PRIMARY KEY ("id"),
    CONSTRAINT "test_table_1_table_2_id_unique" UNIQUE ("table_2_id")
);

CREATE TABLE "test_table_2" (
    "id" INTEGER NOT NULL,
    CONSTRAINT "test_table_2_pk" PRIMARY KEY ("id")
);

ALTER TABLE "test_table_1" ADD CONSTRAINT "test_table_1_table_2_id_fk" FOREIGN KEY ("table_2_id") REFERENCES "test_table_2" ("id");