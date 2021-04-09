CREATE TABLE "TestTable" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "NotNullColumn" INT NOT NULL,
    "UniqueColumn" INT,
    CONSTRAINT "TestTable_pk" PRIMARY KEY ("Id"),
    CONSTRAINT "TestTable_UniqueColumn_unique" UNIQUE ("UniqueColumn")
);