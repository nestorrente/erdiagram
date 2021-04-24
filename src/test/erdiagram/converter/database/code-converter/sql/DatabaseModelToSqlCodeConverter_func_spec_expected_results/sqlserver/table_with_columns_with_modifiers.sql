CREATE TABLE "TestTable" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "NullableColumn" INT,
    "UniqueColumn" INT NOT NULL,
    CONSTRAINT "TestTable_pk" PRIMARY KEY ("Id"),
    CONSTRAINT "TestTable_UniqueColumn_unique" UNIQUE ("UniqueColumn")
);