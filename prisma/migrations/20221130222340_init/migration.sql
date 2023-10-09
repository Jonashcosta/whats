-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `from` VARCHAR(191) NOT NULL,
    `notifyName` VARCHAR(191) NULL,
    `timestamp` BIGINT NULL,
    `stg` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_from_key`(`from`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
