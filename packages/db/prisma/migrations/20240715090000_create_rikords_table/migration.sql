-- CreateTable
CREATE TABLE "rikords" (
    "id" SERIAL NOT NULL,
    "riko_image_id" INTEGER NOT NULL,
    "rikord_mode_id" INTEGER NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rikords_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rikords" ADD CONSTRAINT "rikords_riko_image_id_fkey" FOREIGN KEY ("riko_image_id") REFERENCES "riko_images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rikords" ADD CONSTRAINT "rikords_rikord_mode_id_fkey" FOREIGN KEY ("rikord_mode_id") REFERENCES "rikord_modes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
