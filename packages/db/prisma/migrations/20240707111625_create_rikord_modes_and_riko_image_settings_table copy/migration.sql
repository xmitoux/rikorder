-- CreateTable
CREATE TABLE "rikord_modes" (
    "id" INTEGER NOT NULL,
    "mode_name" TEXT NOT NULL,
    "monthly_goal" INTEGER NOT NULL,

    CONSTRAINT "rikord_modes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "riko_image_settings" (
    "id" SERIAL NOT NULL,
    "riko_image_id" INTEGER NOT NULL,
    "rikord_mode_id" INTEGER NOT NULL,
    "is_favorite" BOOLEAN NOT NULL,

    CONSTRAINT "riko_image_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "riko_image_settings_riko_image_id_rikord_mode_id_key" ON "riko_image_settings"("riko_image_id", "rikord_mode_id");

-- AddForeignKey
ALTER TABLE "riko_image_settings" ADD CONSTRAINT "riko_image_settings_riko_image_id_fkey" FOREIGN KEY ("riko_image_id") REFERENCES "riko_images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riko_image_settings" ADD CONSTRAINT "riko_image_settings_rikord_mode_id_fkey" FOREIGN KEY ("rikord_mode_id") REFERENCES "rikord_modes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
