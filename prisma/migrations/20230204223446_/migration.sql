/*
  Warnings:

  - Added the required column `date` to the `waitings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_id` to the `waitings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "waitings" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "service_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "waitings" ADD CONSTRAINT "waitings_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
