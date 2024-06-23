-- CreateTable
CREATE TABLE "riko_images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "riko_images_pkey" PRIMARY KEY ("id")
);
