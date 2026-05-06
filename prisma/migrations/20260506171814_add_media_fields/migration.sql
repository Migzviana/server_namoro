/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Memory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Memory" DROP COLUMN "imageUrl",
ADD COLUMN     "mediaType" TEXT,
ADD COLUMN     "mediaUrl" TEXT;
