CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_name TEXT NOT NULL,
  slug TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'United States',
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  show_in_navigation BOOLEAN NOT NULL DEFAULT FALSE,
  navigation_order INTEGER NOT NULL DEFAULT 0,
  hero_heading TEXT NOT NULL,
  hero_subheading TEXT NOT NULL DEFAULT '',
  hero_description TEXT NOT NULL DEFAULT '',
  hero_image_url TEXT,
  hero_image_alt TEXT NOT NULL DEFAULT '',
  hero_cta_text TEXT,
  why_visit_heading TEXT NOT NULL,
  why_visit_description TEXT NOT NULL DEFAULT '',
  best_time_heading TEXT NOT NULL DEFAULT 'Best time to visit',
  best_time_summary TEXT NOT NULL DEFAULT '',
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image_url TEXT,
  primary_keyword TEXT,
  secondary_keywords TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT destinations_slug_key UNIQUE (slug),
  CONSTRAINT destinations_slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

CREATE INDEX IF NOT EXISTS destinations_published_nav_idx
  ON destinations (published, show_in_navigation, navigation_order);

CREATE INDEX IF NOT EXISTS destinations_published_idx
  ON destinations (published, destination_name);

CREATE TABLE IF NOT EXISTS destination_things_to_do (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID NOT NULL REFERENCES destinations (id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  image_alt TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS destination_things_to_do_destination_id_idx
  ON destination_things_to_do (destination_id, sort_order);

CREATE TABLE IF NOT EXISTS destination_experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID NOT NULL REFERENCES destinations (id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  image_alt TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS destination_experiences_destination_id_idx
  ON destination_experiences (destination_id, sort_order);

CREATE TABLE IF NOT EXISTS destination_culinary_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID NOT NULL REFERENCES destinations (id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  image_alt TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS destination_culinary_items_destination_id_idx
  ON destination_culinary_items (destination_id, sort_order);

CREATE TABLE IF NOT EXISTS destination_airports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID NOT NULL REFERENCES destinations (id) ON DELETE CASCADE,
  airport_name TEXT NOT NULL,
  airport_code TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  distance_or_area TEXT NOT NULL DEFAULT '',
  airport_link TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS destination_airports_destination_id_idx
  ON destination_airports (destination_id, sort_order);

CREATE TABLE IF NOT EXISTS destination_seasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID NOT NULL REFERENCES destinations (id) ON DELETE CASCADE,
  season TEXT NOT NULL,
  months TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS destination_seasons_destination_id_idx
  ON destination_seasons (destination_id, sort_order);

CREATE TABLE IF NOT EXISTS destination_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID NOT NULL REFERENCES destinations (id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS destination_faqs_destination_id_idx
  ON destination_faqs (destination_id, sort_order);

CREATE TABLE IF NOT EXISTS destination_gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID NOT NULL REFERENCES destinations (id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_alt TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS destination_gallery_images_destination_id_idx
  ON destination_gallery_images (destination_id, sort_order);

DROP TRIGGER IF EXISTS destinations_set_updated_at ON destinations;
CREATE TRIGGER destinations_set_updated_at
  BEFORE UPDATE ON destinations
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS destination_things_to_do_set_updated_at ON destination_things_to_do;
CREATE TRIGGER destination_things_to_do_set_updated_at
  BEFORE UPDATE ON destination_things_to_do
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS destination_experiences_set_updated_at ON destination_experiences;
CREATE TRIGGER destination_experiences_set_updated_at
  BEFORE UPDATE ON destination_experiences
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS destination_culinary_items_set_updated_at ON destination_culinary_items;
CREATE TRIGGER destination_culinary_items_set_updated_at
  BEFORE UPDATE ON destination_culinary_items
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS destination_airports_set_updated_at ON destination_airports;
CREATE TRIGGER destination_airports_set_updated_at
  BEFORE UPDATE ON destination_airports
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS destination_seasons_set_updated_at ON destination_seasons;
CREATE TRIGGER destination_seasons_set_updated_at
  BEFORE UPDATE ON destination_seasons
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS destination_faqs_set_updated_at ON destination_faqs;
CREATE TRIGGER destination_faqs_set_updated_at
  BEFORE UPDATE ON destination_faqs
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS destination_gallery_images_set_updated_at ON destination_gallery_images;
CREATE TRIGGER destination_gallery_images_set_updated_at
  BEFORE UPDATE ON destination_gallery_images
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();
