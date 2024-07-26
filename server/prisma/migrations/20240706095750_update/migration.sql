/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `OutreachContact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `OutreachContact` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "OutreachContact" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "OutreachContact_name_key" ON "OutreachContact"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OutreachContact_phoneNumber_key" ON "OutreachContact"("phoneNumber");
