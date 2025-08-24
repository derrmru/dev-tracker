/*
  Warnings:

  - You are about to drop the column `age` on the `Child` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,dateOfBirth]` on the table `Child` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateOfBirth` to the `Child` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Child_name_age_key";

-- AlterTable
ALTER TABLE "Child" DROP COLUMN "age",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Child_name_dateOfBirth_key" ON "Child"("name", "dateOfBirth");
