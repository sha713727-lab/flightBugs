ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS hero_media_asset_id UUID REFERENCES media_assets (id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS og_media_asset_id UUID REFERENCES media_assets (id) ON DELETE SET NULL;

ALTER TABLE destination_things_to_do
  ADD COLUMN IF NOT EXISTS image_media_asset_id UUID REFERENCES media_assets (id) ON DELETE SET NULL;

ALTER TABLE destination_experiences
  ADD COLUMN IF NOT EXISTS image_media_asset_id UUID REFERENCES media_assets (id) ON DELETE SET NULL;

ALTER TABLE destination_culinary_items
  ADD COLUMN IF NOT EXISTS image_media_asset_id UUID REFERENCES media_assets (id) ON DELETE SET NULL;

DELETE FROM destination_gallery_images;

ALTER TABLE destination_gallery_images
  ADD COLUMN IF NOT EXISTS media_asset_id UUID REFERENCES media_assets (id) ON DELETE CASCADE;

ALTER TABLE destination_gallery_images
  ALTER COLUMN media_asset_id SET NOT NULL;

CREATE INDEX IF NOT EXISTS destinations_hero_media_asset_id_idx
  ON destinations (hero_media_asset_id);

CREATE INDEX IF NOT EXISTS destinations_og_media_asset_id_idx
  ON destinations (og_media_asset_id);

CREATE INDEX IF NOT EXISTS destination_things_to_do_image_media_asset_id_idx
  ON destination_things_to_do (image_media_asset_id);

CREATE INDEX IF NOT EXISTS destination_experiences_image_media_asset_id_idx
  ON destination_experiences (image_media_asset_id);

CREATE INDEX IF NOT EXISTS destination_culinary_items_image_media_asset_id_idx
  ON destination_culinary_items (image_media_asset_id);

CREATE INDEX IF NOT EXISTS destination_gallery_images_media_asset_id_idx
  ON destination_gallery_images (media_asset_id);

ALTER TABLE destinations DROP COLUMN IF EXISTS hero_image_url;
ALTER TABLE destinations DROP COLUMN IF EXISTS og_image_url;
ALTER TABLE destination_things_to_do DROP COLUMN IF EXISTS image_url;
ALTER TABLE destination_experiences DROP COLUMN IF EXISTS image_url;
ALTER TABLE destination_culinary_items DROP COLUMN IF EXISTS image_url;
ALTER TABLE destination_gallery_images DROP COLUMN IF EXISTS image_url;
