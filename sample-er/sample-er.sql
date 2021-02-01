CREATE TABLE `User` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `birthday` DATE,
    `active` BOOLEAN NOT NULL,
    `countryId` BIGINT NOT NULL,
    `alternativeCountryId` BIGINT,
    CONSTRAINT `User_pk` PRIMARY KEY (`id`)
);

CREATE TABLE `Country` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(5) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    CONSTRAINT `Country_pk` PRIMARY KEY (`id`)
);

CREATE TABLE `Permission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(30) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    CONSTRAINT `Permission_pk` PRIMARY KEY (`id`)
);

CREATE TABLE `Tree` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `headNodeId` BIGINT NOT NULL,
    CONSTRAINT `Tree_pk` PRIMARY KEY (`id`)
);

CREATE TABLE `TreeNode` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `value` INT NOT NULL,
    `parentId` BIGINT,
    CONSTRAINT `TreeNode_pk` PRIMARY KEY (`id`)
);

CREATE TABLE `UserPermission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `permissionId` BIGINT NOT NULL,
    CONSTRAINT `UserPermission_pk` PRIMARY KEY (`id`)
);

CREATE TABLE `Follows` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `followerId` BIGINT NOT NULL,
    `followId` BIGINT NOT NULL,
    CONSTRAINT `Follows_pk` PRIMARY KEY (`id`)
);

ALTER TABLE `User` ADD CONSTRAINT `User_countryId_fk` FOREIGN KEY (`countryId`) REFERENCES `Country` (`id`);
ALTER TABLE `User` ADD CONSTRAINT `User_alternativeCountryId_fk` FOREIGN KEY (`alternativeCountryId`) REFERENCES `Country` (`id`);

ALTER TABLE `Tree` ADD CONSTRAINT `Tree_headNodeId_fk` FOREIGN KEY (`headNodeId`) REFERENCES `TreeNode` (`id`);

ALTER TABLE `TreeNode` ADD CONSTRAINT `TreeNode_parentId_fk` FOREIGN KEY (`parentId`) REFERENCES `TreeNode` (`id`);

ALTER TABLE `UserPermission` ADD CONSTRAINT `UserPermission_userId_fk` FOREIGN KEY (`userId`) REFERENCES `User` (`id`);
ALTER TABLE `UserPermission` ADD CONSTRAINT `UserPermission_permissionId_fk` FOREIGN KEY (`permissionId`) REFERENCES `Permission` (`id`);

ALTER TABLE `Follows` ADD CONSTRAINT `Follows_followerId_fk` FOREIGN KEY (`followerId`) REFERENCES `User` (`id`);
ALTER TABLE `Follows` ADD CONSTRAINT `Follows_followId_fk` FOREIGN KEY (`followId`) REFERENCES `User` (`id`);
