/*
  Warnings:

  - You are about to alter the column `name` on the `FirstTimer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[name]` on the table `FirstTimer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `FirstTimer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FirstTimer" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "FirstTimer_name_key" ON "FirstTimer"("name");
