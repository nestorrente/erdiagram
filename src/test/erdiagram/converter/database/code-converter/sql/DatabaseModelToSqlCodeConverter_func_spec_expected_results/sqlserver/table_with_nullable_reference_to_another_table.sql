CREATE TABLE "TestTable1" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "Table2Id" BIGINT,
    CONSTRAINT "TestTable1_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "TestTable2" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    CONSTRAINT "TestTable2_pk" PRIMARY KEY ("Id")
);

ALTER TABLE "TestTable1" ADD CONSTRAINT "TestTable1_Table2Id_fk" FOREIGN KEY ("Table2Id") REFERENCES "TestTable2" ("Id");