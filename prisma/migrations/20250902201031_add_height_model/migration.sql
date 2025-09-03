-- CreateTable
CREATE TABLE "Height" (
    "id" SERIAL NOT NULL,
    "height" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdate" TIMESTAMP(3) NOT NULL,
    "childId" INTEGER NOT NULL,

    CONSTRAINT "Height_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Height_childId_height_key" ON "Height"("childId", "height");

-- AddForeignKey
ALTER TABLE "Height" ADD CONSTRAINT "Height_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
