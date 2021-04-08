CREATE TABLE `Modifiers_Table` (
    `the_id_of_modifiers_table` CUSTOM_IDENTIFIER_TYPE NOT NULL AUTO_INCREMENT,
    `not_null_column` CUSTOM_INT_TYPE NOT NULL,
    `unique_column` CUSTOM_INT_TYPE,
    `autoincremental_column` CUSTOM_INT_TYPE AUTO_INCREMENT,
    CONSTRAINT `Modifiers_Table_pk` PRIMARY KEY (`the_id_of_modifiers_table`),
    CONSTRAINT `Modifiers_Table_unique_column_unique` UNIQUE (`unique_column`)
);

CREATE TABLE `Types_Table` (
    `the_id_of_types_table` CUSTOM_IDENTIFIER_TYPE NOT NULL AUTO_INCREMENT,
    `boolean_column` CUSTOM_BOOLEAN_TYPE NOT NULL,
    `short_column` CUSTOM_SHORT_TYPE NOT NULL,
    `int_column` CUSTOM_INT_TYPE NOT NULL,
    `long_column` CUSTOM_LONG_TYPE NOT NULL,
    `decimal_column` CUSTOM_DECIMAL_TYPE(10, 3) NOT NULL,
    `text_column` CUSTOM_TEXT_TYPE(50) NOT NULL,
    `date_column` CUSTOM_DATE_TYPE NOT NULL,
    `time_column` CUSTOM_TIME_TYPE NOT NULL,
    `datetime_column` CUSTOM_DATETIME_TYPE NOT NULL,
    `blob_column` CUSTOM_BLOB_TYPE NOT NULL,
    CONSTRAINT `Types_Table_pk` PRIMARY KEY (`the_id_of_types_table`)
);

CREATE TABLE `References_Table` (
    `the_id_of_references_table` CUSTOM_IDENTIFIER_TYPE NOT NULL AUTO_INCREMENT,
    `modifiers_id` CUSTOM_IDENTIFIER_TYPE NOT NULL,
    `types_id` CUSTOM_IDENTIFIER_TYPE,
    `references_id` CUSTOM_IDENTIFIER_TYPE NOT NULL,
    CONSTRAINT `References_Table_pk` PRIMARY KEY (`the_id_of_references_table`),
    CONSTRAINT `References_Table_references_id_unique` UNIQUE (`references_id`)
);

ALTER TABLE `References_Table` ADD CONSTRAINT `References_Table_modifiers_id_fk` FOREIGN KEY (`modifiers_id`) REFERENCES `Modifiers_Table` (`the_id_of_modifiers_table`);
ALTER TABLE `References_Table` ADD CONSTRAINT `References_Table_types_id_fk` FOREIGN KEY (`types_id`) REFERENCES `Types_Table` (`the_id_of_types_table`);
ALTER TABLE `References_Table` ADD CONSTRAINT `References_Table_references_id_fk` FOREIGN KEY (`references_id`) REFERENCES `References_Table` (`the_id_of_references_table`);