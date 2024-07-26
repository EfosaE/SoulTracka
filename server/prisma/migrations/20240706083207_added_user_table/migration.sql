/*
  Warnings:

  - The primary key for the `FirstTimer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `FirstTimer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `outreachContactsId` column on the `FirstTimer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `OutreachContact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `OutreachContact` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `firstTimersId` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "FirstTimer" DROP CONSTRAINT "FirstTimer_outreachContactsId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_firstTimersId_fkey";

-- AlterTable
ALTER TABLE "FirstTimer" DROP CONSTRAINT "FirstTimer_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "outreachContactsId",
ADD COLUMN     "outreachContactsId" INTEGER,
ADD CONSTRAINT "FirstTimer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OutreachContact" DROP CONSTRAINT "OutreachContact_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "OutreachContact_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "firstTimersId",
ADD COLUMN     "firstTimersId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FirstTimer_outreachContactsId_key" ON "FirstTimer"("outreachContactsId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_firstTimersId_key" ON "Student"("firstTimersId");

-- AddForeignKey
ALTER TABLE "FirstTimer" ADD CONSTRAINT "FirstTimer_outreachContactsId_fkey" FOREIGN KEY ("outreachContactsId") REFERENCES "OutreachContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_firstTimersId_fkey" FOREIGN KEY ("firstTimersId") REFERENCES "FirstTimer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
