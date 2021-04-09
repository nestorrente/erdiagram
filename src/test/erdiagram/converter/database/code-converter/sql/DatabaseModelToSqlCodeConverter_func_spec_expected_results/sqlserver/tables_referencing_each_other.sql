CREATE TABLE "TestTable1" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "Table2Id" BIGINT NOT NULL,
    CONSTRAINT "TestTable1_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "TestTable2" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "Table1Id" BIGINT NOT NULL,
    CONSTRAINT "TestTable2_pk" PRIMARY KEY ("Id")
);

ALTER TABLE "TestTable1" ADD CONSTRAINT "TestTable1_Table2Id_fk" FOREIGN KEY ("Table2Id") REFERENCES "TestTable2" ("Id");

ALTER TABLE "TestTable2" ADD CONSTRAINT "TestTable2_Table1Id_fk" FOREIGN KEY ("Table1Id") REFERENCES "TestTable1" ("Id");