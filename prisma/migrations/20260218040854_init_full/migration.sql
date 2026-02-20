-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'OPERATOR', 'ANALYST');

-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('BLACKLIST', 'WATCHLIST');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ANALYST',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "refreshTokenHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EdgeNode" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DESCONOCIDO',
    "lastSeenAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EdgeNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Camera" (
    "id" TEXT NOT NULL,
    "edgeNodeId" TEXT,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "status" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "rtspUrl" TEXT,
    "lastSeenAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Camera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertPlate" (
    "id" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "type" "AlertType" NOT NULL,
    "description" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlertPlate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlateEvent" (
    "id" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "cameraId" TEXT NOT NULL,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageUrl" TEXT,
    "isAlert" BOOLEAN NOT NULL DEFAULT false,
    "alertType" "AlertType",
    "raw" JSONB,

    CONSTRAINT "PlateEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Camera_edgeNodeId_idx" ON "Camera"("edgeNodeId");

-- CreateIndex
CREATE INDEX "AlertPlate_plate_idx" ON "AlertPlate"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "AlertPlate_plate_type_key" ON "AlertPlate"("plate", "type");

-- CreateIndex
CREATE INDEX "PlateEvent_plate_idx" ON "PlateEvent"("plate");

-- CreateIndex
CREATE INDEX "PlateEvent_capturedAt_idx" ON "PlateEvent"("capturedAt");

-- CreateIndex
CREATE INDEX "PlateEvent_cameraId_capturedAt_idx" ON "PlateEvent"("cameraId", "capturedAt");

-- AddForeignKey
ALTER TABLE "Camera" ADD CONSTRAINT "Camera_edgeNodeId_fkey" FOREIGN KEY ("edgeNodeId") REFERENCES "EdgeNode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlateEvent" ADD CONSTRAINT "PlateEvent_cameraId_fkey" FOREIGN KEY ("cameraId") REFERENCES "Camera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
