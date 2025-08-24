/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Words` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Words` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[childId,word]` on the table `Words` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `childId` to the `Words` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Words" DROP CONSTRAINT "Words_userId_fkey";

-- DropIndex
DROP INDEX "Words_userId_word_key";

-- AlterTable
ALTER TABLE "Words" DROP COLUMN "createdAt",
DROP COLUMN "userId",
ADD COLUMN     "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "childId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Words_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Child" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Child_name_age_key" ON "Child"("name", "age");

-- CreateIndex
CREATE UNIQUE INDEX "Words_childId_word_key" ON "Words"("childId", "word");

-- AddForeignKey
ALTER TABLE "Words" ADD CONSTRAINT "Words_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
