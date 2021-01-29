CREATE TABLE `Person` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `cityId` BIGINT NOT NULL,
    `alternativeCityId` BIGINT NOT NULL,
    CONSTRAINT `Person_pk` PRIMARY KEY (`id`),
    CONSTRAINT `Person_cityId_unique` UNIQUE (`cityId`)
);

CREATE TABLE `City` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(10) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    CONSTRAINT `City_pk` PRIMARY KEY (`id`),
    CONSTRAINT `City_code_unique` UNIQUE (`code`)
);

ALTER TABLE `Person` ADD CONSTRAINT `Person_cityId_fk` FOREIGN KEY (`cityId`) REFERENCES `City` (`id`);
ALTER TABLE `Person` ADD CONSTRAINT `Person_alternativeCityId_fk` FOREIGN KEY (`alternativeCityId`) REFERENCES `City` (`id`);
