CREATE SEQUENCE "TEST_TABLE_ID_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE" (
    "ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_ID_SEQ".nextval,
    CONSTRAINT "TEST_TABLE_PK" PRIMARY KEY ("ID")
);