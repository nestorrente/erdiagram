CREATE TABLE "TestTable" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "BooleanColumn" BIT NOT NULL,
    "ShortColumn" SMALLINT NOT NULL,
    "IntColumn" INT NOT NULL,
    "LongColumn" BIGINT NOT NULL,
    "DecimalColumn" DECIMAL(10, 3) NOT NULL,
    "TextColumn" NVARCHAR(50) NOT NULL,
    "DateColumn" DATE NOT NULL,
    "TimeColumn" TIME NOT NULL,
    "DatetimeColumn" DATETIME2 NOT NULL,
    "BlobColumn" VARBINARY(MAX) NOT NULL,
    CONSTRAINT "TestTable_pk" PRIMARY KEY ("Id")
);