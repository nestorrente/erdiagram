CREATE TABLE `TestTable1` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `table2Id` BIGINT,
    CONSTRAINT `TestTable1_pk` PRIMARY KEY (`id`)
);

CREATE TABLE `TestTable2` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    CONSTRAINT `TestTable2_pk` PRIMARY KEY (`id`)
);

ALTER TABLE `TestTable1` ADD CONSTRAINT `TestTable1_table2Id_fk` FOREIGN KEY (`table2Id`) REFERENCES `TestTable2` (`id`);