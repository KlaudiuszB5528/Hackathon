/*
  Warnings:

  - You are about to drop the column `description` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `slots` on the `Game` table. All the data in the column will be lost.
  - Added the required column `gameRules` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participants` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "description",
DROP COLUMN "slots",
ADD COLUMN     "gameRules" TEXT NOT NULL,
ADD COLUMN     "participants" INTEGER NOT NULL;
