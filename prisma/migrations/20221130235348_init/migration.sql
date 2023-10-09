/*
  Warnings:

  - The `timestamp` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `expiresAt` DATETIME(3) NULL,
    DROP COLUMN `timestamp`,
    ADD COLUMN `timestamp` DATETIME(3) NULL;
