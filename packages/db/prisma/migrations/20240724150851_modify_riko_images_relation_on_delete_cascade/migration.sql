-- DropForeignKey
ALTER TABLE "riko_image_settings" DROP CONSTRAINT "riko_image_settings_riko_image_id_fkey";

-- DropForeignKey
ALTER TABLE "rikords" DROP CONSTRAINT "rikords_riko_image_id_fkey";

-- AddForeignKey
ALTER TABLE "riko_image_settings" ADD CONSTRAINT "riko_image_settings_riko_image_id_fkey" FOREIGN KEY ("riko_image_id") REFERENCES "riko_images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rikords" ADD CONSTRAINT "rikords_riko_image_id_fkey" FOREIGN KEY ("riko_image_id") REFERENCES "riko_images"("id") ON DELETE CASCADE ON UPDATE CASCADE;
