CREATE TABLE `TestTable` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nullableColumn` INT,
    `uniqueColumn` INT NOT NULL,
    CONSTRAINT `TestTable_pk` PRIMARY KEY (`id`),
    CONSTRAINT `TestTable_uniqueColumn_unique` UNIQUE (`uniqueColumn`)
);