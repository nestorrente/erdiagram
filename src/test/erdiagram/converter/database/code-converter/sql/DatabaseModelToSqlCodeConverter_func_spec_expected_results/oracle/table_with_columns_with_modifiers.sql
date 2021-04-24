CREATE SEQUENCE "TEST_TABLE_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE" (
    "ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_SEQ".nextval,
    "NULLABLE_COLUMN" NUMBER,
    "UNIQUE_COLUMN" NUMBER NOT NULL,
    CONSTRAINT "TEST_TABLE_PK" PRIMARY KEY ("ID"),
    CONSTRAINT "TEST_TABLE_UNIQUE_COLUMN_UNIQUE" UNIQUE ("UNIQUE_COLUMN")
);