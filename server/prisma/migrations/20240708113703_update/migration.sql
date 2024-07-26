/*
  Warnings:

  - You are about to drop the column `outreachContactsId` on the `FirstTimer` table. All the data in the column will be lost.
  - You are about to drop the column `firstTimersId` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `FirstTimer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearOfGrad` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_firstTimersId_fkey";

-- DropIndex
DROP INDEX "FirstTimer_outreachContactsId_key";

-- DropIndex
DROP INDEX "Student_firstTimersId_key";

-- AlterTable
ALTER TABLE "FirstTimer" DROP COLUMN "outreachContactsId",
ALTER COLUMN "isStudent" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "firstTimersId",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" VARCHAR(20) NOT NULL,
ADD COLUMN     "yearOfGrad" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FirstTimer_phoneNumber_key" ON "FirstTimer"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Student_phoneNumber_key" ON "Student"("phoneNumber");
