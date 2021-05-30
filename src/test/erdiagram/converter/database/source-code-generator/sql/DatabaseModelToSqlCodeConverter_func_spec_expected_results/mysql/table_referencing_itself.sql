CREATE TABLE `TestTable` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `selfReferenceId` BIGINT NOT NULL,
    CONSTRAINT `TestTable_pk` PRIMARY KEY (`id`)
);

ALTER TABLE `TestTable` ADD CONSTRAINT `TestTable_selfReferenceId_fk` FOREIGN KEY (`selfReferenceId`) REFERENCES `TestTable` (`id`);