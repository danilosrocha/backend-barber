/*
  Warnings:

  - You are about to drop the column `barber` on the `barbers` table. All the data in the column will be lost.
  - Added the required column `barber_name` to the `barbers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "barbers" DROP COLUMN "barber",
ADD COLUMN     "barber_name" TEXT NOT NULL;
