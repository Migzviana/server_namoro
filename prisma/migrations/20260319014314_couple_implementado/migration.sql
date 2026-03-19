/*
  Warnings:

  - Added the required column `coupleId` to the `Memory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Memory" ADD COLUMN     "coupleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coupleId" INTEGER;

-- CreateTable
CREATE TABLE "Couple" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Couple_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "Couple"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "Couple"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
