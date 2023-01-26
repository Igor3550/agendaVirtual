/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `schedules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "deletedAt",
ADD COLUMN     "finished" BOOLEAN NOT NULL DEFAULT false;
