/*
  Warnings:

  - A unique constraint covering the columns `[name,stageId]` on the table `Phase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,tournamentId]` on the table `Stage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Phase_name_stageId_key` ON `Phase`(`name`, `stageId`);

-- CreateIndex
CREATE UNIQUE INDEX `Stage_name_tournamentId_key` ON `Stage`(`name`, `tournamentId`);

-- CreateIndex
CREATE UNIQUE INDEX `Tournament_title_key` ON `Tournament`(`title`);
