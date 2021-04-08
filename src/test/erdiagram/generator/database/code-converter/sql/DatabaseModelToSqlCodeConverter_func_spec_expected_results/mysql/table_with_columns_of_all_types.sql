CREATE TABLE `TestTable` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `booleanColumn` BOOLEAN NOT NULL,
    `shortColumn` SHORT NOT NULL,
    `intColumn` INT NOT NULL,
    `longColumn` BIGINT NOT NULL,
    `decimalColumn` DECIMAL(10, 3) NOT NULL,
    `textColumn` VARCHAR(50) NOT NULL,
    `dateColumn` DATE NOT NULL,
    `timeColumn` TIME NOT NULL,
    `datetimeColumn` TIMESTAMP NOT NULL,
    `blobColumn` BLOB NOT NULL,
    CONSTRAINT `TestTable_pk` PRIMARY KEY (`id`)
);