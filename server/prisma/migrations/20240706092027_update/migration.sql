/*
  Warnings:

  - You are about to drop the column `address` on the `OutreachContact` table. All the data in the column will be lost.
  - Added the required column `outreachLocation` to the `OutreachContact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OutreachContact" DROP COLUMN "address",
ADD COLUMN     "outreachLocation" TEXT NOT NULL;
