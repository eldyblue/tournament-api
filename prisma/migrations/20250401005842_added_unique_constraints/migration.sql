/*
  Warnings:

  - A unique constraint covering the columns `[contenderId,tournamentId]` on the table `Contender` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teamId,userId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memberId,roleId]` on the table `MemberRole` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,tournamentId]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staffId,roleId]` on the table `StaffRole` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Contender_contenderId_tournamentId_key` ON `Contender`(`contenderId`, `tournamentId`);

-- CreateIndex
CREATE UNIQUE INDEX `Member_teamId_userId_key` ON `Member`(`teamId`, `userId`);

-- CreateIndex
CREATE UNIQUE INDEX `MemberRole_memberId_roleId_key` ON `MemberRole`(`memberId`, `roleId`);

-- CreateIndex
CREATE UNIQUE INDEX `Staff_userId_tournamentId_key` ON `Staff`(`userId`, `tournamentId`);

-- CreateIndex
CREATE UNIQUE INDEX `StaffRole_staffId_roleId_key` ON `StaffRole`(`staffId`, `roleId`);
