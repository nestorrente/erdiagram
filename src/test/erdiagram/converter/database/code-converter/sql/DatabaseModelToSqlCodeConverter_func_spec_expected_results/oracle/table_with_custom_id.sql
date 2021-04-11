CREATE SEQUENCE "TEST_TABLE_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE" (
    "THE_CUSTOM_IDENTITY_OF_TEST_TABLE" NUMBER NOT NULL DEFAULT "TEST_TABLE_SEQ".nextval,
    CONSTRAINT "TEST_TABLE_PK" PRIMARY KEY ("THE_CUSTOM_IDENTITY_OF_TEST_TABLE")
);