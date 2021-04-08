CREATE TABLE `TestTable` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `notNullColumn` INT NOT NULL,
    `uniqueColumn` INT,
    `autoincrementalColumn` INT AUTO_INCREMENT,
    CONSTRAINT `TestTable_pk` PRIMARY KEY (`id`),
    CONSTRAINT `TestTable_uniqueColumn_unique` UNIQUE (`uniqueColumn`)
);