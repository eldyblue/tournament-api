/*
  Warnings:

  - You are about to drop the `Tournaments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Contender` DROP FOREIGN KEY `Contender_tournamentId_fkey`;

-- DropForeignKey
ALTER TABLE `Staff` DROP FOREIGN KEY `Staff_tournamentId_fkey`;

-- DropForeignKey
ALTER TABLE `Stage` DROP FOREIGN KEY `Stage_tournamentId_fkey`;

-- DropForeignKey
ALTER TABLE `Tournaments` DROP FOREIGN KEY `Tournaments_ownerId_fkey`;

-- DropIndex
DROP INDEX `Contender_tournamentId_fkey` ON `Contender`;

-- DropIndex
DROP INDEX `Staff_tournamentId_fkey` ON `Staff`;

-- DropIndex
DROP INDEX `Stage_tournamentId_fkey` ON `Stage`;

-- DropTable
DROP TABLE `Tournaments`;

-- CreateTable
CREATE TABLE `Tournament` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `format` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `as_team` BOOLEAN NOT NULL,
    `use_seed` BOOLEAN NOT NULL,
    `team_size` INTEGER NOT NULL,
    `min_rank` INTEGER NULL,
    `max_rank` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tournament` ADD CONSTRAINT `Tournament_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stage` ADD CONSTRAINT `Stage_tournamentId_fkey` FOREIGN KEY (`tournamentId`) REFERENCES `Tournament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_tournamentId_fkey` FOREIGN KEY (`tournamentId`) REFERENCES `Tournament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contender` ADD CONSTRAINT `Contender_tournamentId_fkey` FOREIGN KEY (`tournamentId`) REFERENCES `Tournament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
