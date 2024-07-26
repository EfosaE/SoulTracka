/*
  Warnings:

  - Made the column `outreachDateTime` on table `OutreachContact` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OutreachContact" ALTER COLUMN "outreachDateTime" SET NOT NULL;
