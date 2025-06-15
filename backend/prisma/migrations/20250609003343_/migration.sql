/*
  Warnings:

  - You are about to drop the column `contenido` on the `Escrito` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Escrito` table. All the data in the column will be lost.
  - Added the required column `archivoUrl` to the `Escrito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creadoPorId` to the `Escrito` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Escrito" DROP COLUMN "contenido",
DROP COLUMN "fecha",
ADD COLUMN     "archivoUrl" TEXT NOT NULL,
ADD COLUMN     "creadoPorId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descripcion" TEXT;

-- AddForeignKey
ALTER TABLE "Escrito" ADD CONSTRAINT "Escrito_creadoPorId_fkey" FOREIGN KEY ("creadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
