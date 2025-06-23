-- CreateTable
CREATE TABLE "Carpeta" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "expediente" TEXT NOT NULL,
    "tipoProceso" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3),
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Carpeta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Carpeta" ADD CONSTRAINT "Carpeta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
