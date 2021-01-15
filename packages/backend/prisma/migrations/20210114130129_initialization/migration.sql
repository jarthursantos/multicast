-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "Charge" AS ENUM ('BEAT', 'VOLUME', 'PIPE');

-- CreateEnum
CREATE TYPE "Receipt" AS ENUM ('MONEY', 'DEPOSIT', 'PENDING');

-- CreateEnum
CREATE TYPE "Freight" AS ENUM ('CIF', 'FOB');

-- CreateEnum
CREATE TYPE "Vehicle" AS ENUM ('EXTERNAL', 'INTERNAL');

-- CreateEnum
CREATE TYPE "Divergence" AS ENUM ('ADDED', 'RECEIVED', 'NOT_RECEIVED', 'RESCHEDULED');

-- CreateEnum
CREATE TYPE "InvoiceOrigin" AS ENUM ('SCHEDULE', 'FOLLOWUP');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',
    "permissionsId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disabledAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "accessSchedules" BOOLEAN NOT NULL DEFAULT false,
    "createRequest" BOOLEAN NOT NULL DEFAULT false,
    "createSchedule" BOOLEAN NOT NULL DEFAULT false,
    "closeSchedule" BOOLEAN NOT NULL DEFAULT false,
    "manageInvoicesInSchedule" BOOLEAN NOT NULL DEFAULT false,
    "addExtraScheduledInvoices" BOOLEAN NOT NULL DEFAULT false,
    "receiveSchedule" BOOLEAN NOT NULL DEFAULT false,
    "cancelSchedule" BOOLEAN NOT NULL DEFAULT false,
    "rescheduleSchedule" BOOLEAN NOT NULL DEFAULT false,
    "accessAccompaniments" BOOLEAN NOT NULL DEFAULT false,
    "manageAccompaniments" BOOLEAN NOT NULL DEFAULT false,
    "accessRepresentatives" BOOLEAN NOT NULL DEFAULT false,
    "viewValues" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accompaniments" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "releasedAt" TIMESTAMP(3),
    "expectedBillingAt" TIMESTAMP(3),
    "billingAt" TIMESTAMP(3),
    "freeOnBoardAt" TIMESTAMP(3),
    "schedulingAt" TIMESTAMP(3),
    "valueDelivered" DECIMAL(65,30) DEFAULT 0.0,
    "invoiceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sendedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "renewedAt" TIMESTAMP(3),
    "accompanimentsId" TEXT,
    "invoiceNumber" INTEGER,
    "invoiceProvider" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accompanimentAnnotations" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "accompanimentId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cancelations" (
    "accompanimentId" TEXT NOT NULL,
    "motive" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("accompanimentId")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL,
    "dischargeTableId" TEXT NOT NULL,
    "scheduleRequestId" TEXT,
    "scheduledAt" TIMESTAMP(3),
    "priority" BOOLEAN NOT NULL DEFAULT false,
    "shippingName" TEXT,
    "freightType" "Freight",
    "vehicleType" "Vehicle",
    "lecturer" TEXT,
    "driver" TEXT,
    "vehicleSize" "Size",
    "chargeType" "Charge",
    "palletized" BOOLEAN,
    "assistant" BOOLEAN,
    "pipeSize" "Size",
    "receiptPerInvoice" BOOLEAN,
    "dischargeValue" DECIMAL(65,30),
    "receiptValue" DECIMAL(65,30),
    "paymentMethod" "Receipt",
    "closedAt" TIMESTAMP(3),
    "receivedAt" TIMESTAMP(3),
    "rescheduledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "canceledAt" TIMESTAMP(3),
    "motive" TEXT,
    "schedulesId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scheduleRequests" (
    "id" TEXT NOT NULL,
    "requestedDate" TIMESTAMP(3),
    "providerCode" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "origin" "InvoiceOrigin" NOT NULL,
    "providerCode" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "value" DECIMAL(65,30),
    "emittedAt" TIMESTAMP(3),
    "key" TEXT,
    "weight" DECIMAL(65,30),
    "volume" DECIMAL(65,30),
    "cteNumber" INTEGER,
    "cteKey" TEXT,
    "dischargeValue" DECIMAL(65,30),
    "receiptValue" DECIMAL(65,30),
    "divergence" "Divergence",
    "scheduleId" TEXT,
    "invoiceFileId" TEXT,
    "cteFileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "canceledAt" TIMESTAMP(3),
    "importation" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalname" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dischargeTable" (
    "id" TEXT NOT NULL,
    "smallPipe" DECIMAL(65,30) NOT NULL,
    "mediumPipe" DECIMAL(65,30) NOT NULL,
    "largePipe" DECIMAL(65,30) NOT NULL,
    "beatPalletizedWithAssistant" DECIMAL(65,30) NOT NULL,
    "beatPalletizedWithoutAssistant" DECIMAL(65,30) NOT NULL,
    "beatNonPalletizedWithAssistant" DECIMAL(65,30) NOT NULL,
    "beatNonPalletizedWithoutAssistant" DECIMAL(65,30) NOT NULL,
    "volumePalletizedWithAssistant" DECIMAL(65,30) NOT NULL,
    "volumePalletizedWithoutAssistant" DECIMAL(65,30) NOT NULL,
    "volumeNonPalletizedWithAssistant" DECIMAL(65,30) NOT NULL,
    "volumeNonPalletizedWithoutAssistant" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "permissions.title_unique" ON "permissions"("title");

-- CreateIndex
CREATE UNIQUE INDEX "accompaniments.invoiceId_unique" ON "accompaniments"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "accompaniments.accompanimentsId_unique" ON "accompaniments"("accompanimentsId");

-- CreateIndex
CREATE UNIQUE INDEX "cancelations_accompanimentId_unique" ON "cancelations"("accompanimentId");

-- CreateIndex
CREATE UNIQUE INDEX "schedules.scheduleRequestId_unique" ON "schedules"("scheduleRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "schedules.schedulesId_unique" ON "schedules"("schedulesId");

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY("permissionsId")REFERENCES "permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accompaniments" ADD FOREIGN KEY("accompanimentsId")REFERENCES "accompaniments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accompaniments" ADD FOREIGN KEY("invoiceId")REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accompanimentAnnotations" ADD FOREIGN KEY("accompanimentId")REFERENCES "accompaniments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accompanimentAnnotations" ADD FOREIGN KEY("userId")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cancelations" ADD FOREIGN KEY("accompanimentId")REFERENCES "accompaniments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cancelations" ADD FOREIGN KEY("userId")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD FOREIGN KEY("dischargeTableId")REFERENCES "dischargeTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD FOREIGN KEY("scheduleRequestId")REFERENCES "scheduleRequests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD FOREIGN KEY("schedulesId")REFERENCES "schedules"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD FOREIGN KEY("cteFileId")REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD FOREIGN KEY("invoiceFileId")REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD FOREIGN KEY("scheduleId")REFERENCES "schedules"("id") ON DELETE SET NULL ON UPDATE CASCADE;
