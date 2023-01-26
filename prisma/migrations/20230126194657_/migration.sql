/*
  Warnings:

  - You are about to drop the `histories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "histories" DROP CONSTRAINT "histories_schedule_id_fkey";

-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "deletedAt" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "histories";
