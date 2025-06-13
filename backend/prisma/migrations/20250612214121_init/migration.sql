-- CreateTable
CREATE TABLE "Causa" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,

    CONSTRAINT "Causa_pkey" PRIMARY KEY ("id")
);
