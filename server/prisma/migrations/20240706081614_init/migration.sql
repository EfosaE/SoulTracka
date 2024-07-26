-- CreateTable
CREATE TABLE "OutreachContact" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" TEXT,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "outreachDateTime" TIMESTAMP(3),
    "contacted" BOOLEAN NOT NULL DEFAULT false,
    "groupName" TEXT NOT NULL,

    CONSTRAINT "OutreachContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FirstTimer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "occupation" TEXT,
    "isStudent" BOOLEAN NOT NULL,
    "outreachContactsId" TEXT,

    CONSTRAINT "FirstTimer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "department" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "firstTimersId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FirstTimer_outreachContactsId_key" ON "FirstTimer"("outreachContactsId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_firstTimersId_key" ON "Student"("firstTimersId");

-- AddForeignKey
ALTER TABLE "FirstTimer" ADD CONSTRAINT "FirstTimer_outreachContactsId_fkey" FOREIGN KEY ("outreachContactsId") REFERENCES "OutreachContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_firstTimersId_fkey" FOREIGN KEY ("firstTimersId") REFERENCES "FirstTimer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
