/*
  Warnings:

  - Made the column `gameId` on table `File` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `title` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_gameId_fkey";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "gameId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
