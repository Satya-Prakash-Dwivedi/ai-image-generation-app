/*
  Warnings:

  - You are about to drop the column `imageUrl1` on the `Packs` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl2` on the `Packs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Packs" DROP COLUMN "imageUrl1",
DROP COLUMN "imageUrl2",
ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT '';
