\c productapi_d

DROP TABLE product, related_products, features, styles, cart, skus, photos;

CREATE TABLE IF NOT EXISTS product (
  id BIGINT PRIMARY KEY NOT NULL,
  "name" TEXT NOT NULL,
  slogan TEXT NOT NULL,
  "description" TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS related_products (
  id BIGINT PRIMARY KEY NOT NULL,
  current_product_id INTEGER REFERENCES product(id) NOT NULL,
  related_product_id INTEGER
);

CREATE TABLE IF NOT EXISTS features (
  id BIGINT PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES product(id) NOT NULL,
  feature TEXT,
  "value" TEXT
);

CREATE TABLE IF NOT EXISTS styles (
  id BIGINT PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES product(id) NOT NULL,
  "name" TEXT NOT NULL,
  sale_price TEXT,
  original_price TEXT,
  default_style BOOLEAN
);

CREATE TABLE IF NOT EXISTS cart (
  id BIGSERIAL PRIMARY KEY,
  user_session INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  active BOOLEAN,
  quantity INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS skus (
  id BIGINT PRIMARY KEY NOT NULL,
  style_id INTEGER REFERENCES styles(id) NOT NULL,
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS photos (
  id BIGINT PRIMARY KEY NOT NULL,
  style_id INTEGER REFERENCES styles(id) NOT NULL,
  "url" TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL
);

-- TRUNCATE product, related_products, features, styles, cart, skus, photos;

CREATE UNIQUE INDEX user_sess_prod_id on cart(user_session, product_id);
SET session_replication_role = 'replica';

-- \COPY product FROM './data/product.csv' DELIMITER ',' CSV HEADER;
-- \COPY related_products FROM './data/related.csv' DELIMITER ',' CSV HEADER;
-- \COPY features FROM './data/features.csv' DELIMITER ',' CSV HEADER;
-- \COPY styles FROM './data/styles.csv' DELIMITER ',' CSV HEADER;
-- \COPY cart FROM './data/cart.csv' DELIMITER ',' CSV HEADER;
-- \COPY skus FROM './data/skus.csv' DELIMITER ',' CSV HEADER;
-- \COPY photos FROM './data/photos.csv' DELIMITER ',' CSV HEADER;

SET session_replication_role = 'origin';