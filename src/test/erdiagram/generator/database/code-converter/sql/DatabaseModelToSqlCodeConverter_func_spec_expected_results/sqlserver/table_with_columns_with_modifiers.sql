CREATE SEQUENCE "TestTable_AutoincrementalColumn_seq" START WITH 1;
CREATE TABLE "TestTable" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "NotNullColumn" INT NOT NULL,
    "UniqueColumn" INT,
    "AutoincrementalColumn" INT DEFAULT NEXT VALUE FOR "TestTable_AutoincrementalColumn_seq",
    CONSTRAINT "TestTable_pk" PRIMARY KEY ("Id"),
    CONSTRAINT "TestTable_UniqueColumn_unique" UNIQUE ("UniqueColumn")
);