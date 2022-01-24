const db = require('./database');

module.exports = {
  getAll: (page, limit) => { //DONE
    page = page || 1;
    limit = limit || 20;
    return db.query(`SELECT * FROM product LIMIT $2 OFFSET $1`, [((page * limit) - limit), limit])
  },

  getOne: (productId) => {
    return db.query( //DONE
      `SELECT id, name, slogan, description, category, default_price,
        (SELECT json_agg(features) as features FROM (
          SELECT DISTINCT feature, value FROM features WHERE product_id = $1
        ) AS features)
      FROM product WHERE product.id = $1`,
    [productId])
  },

  findStyles: (productId) => { //DONE
    // return db.query(``, [productId])
    return db.query(`SELECT id AS style_id, name, original_price, sale_price, default_style AS "default?",
          (SELECT json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) AS photos FROM photos WHERE photos.style_id = styles.id),
          (SELECT json_object_agg(id, json_build_object('size', size, 'quantity', quantity)) AS skus FROM skus WHERE skus.style_id = styles.id)
        FROM styles WHERE product_id = $1`, [productId])
  },

  findPhotos: (styleId) => { //TO DO
    return db.query(`SELECT thumbnail_url, url FROM photos WHERE style_id = $1`,[styleId])
  },

  findSkus: (styleId) => {
    return db.query(`SELECT id, size, quantity FROM skus WHERE style_id = $1`, [styleId])
  },

  findRelated: (productId) => { //DONE
    return db.query(`SELECT json_agg(related_product_id) AS related_ids FROM related_products WHERE current_product_id = $1`, [productId])
  },

  findCart: (sessionId) => { //DONE
    return db.query('SELECT product_id AS sku_id, quantity as count FROM cart WHERE user_session = $1 AND active = true', [sessionId])
  },

  addToCart: (sessionId, skuId) => { //DONE
    return db.query(`INSERT INTO cart (user_session, product_id, active, quantity) VALUES ($1, $2, true, 1) ON CONFLICT (user_session, product_id) DO UPDATE SET quantity = (cart.quantity + 1)`, [sessionId, skuId])
  }
}