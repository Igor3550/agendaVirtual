-- CreateTable
CREATE TABLE "waitings" (
    "id" SERIAL NOT NULL,
    "clientName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waitings_pkey" PRIMARY KEY ("id")
);
