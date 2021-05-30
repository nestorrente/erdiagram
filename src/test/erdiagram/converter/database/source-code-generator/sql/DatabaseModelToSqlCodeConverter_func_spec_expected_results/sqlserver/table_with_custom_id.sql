CREATE TABLE "TestTable" (
    "TheCustomIdentityOfTestTable" BIGINT NOT NULL IDENTITY(1, 1),
    CONSTRAINT "TestTable_pk" PRIMARY KEY ("TheCustomIdentityOfTestTable")
);