CREATE TABLE "TestTable" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "SelfReferenceId" BIGINT NOT NULL,
    CONSTRAINT "TestTable_pk" PRIMARY KEY ("Id")
);

ALTER TABLE "TestTable" ADD CONSTRAINT "TestTable_SelfReferenceId_fk" FOREIGN KEY ("SelfReferenceId") REFERENCES "TestTable" ("Id");