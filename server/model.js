const db = require('./database');

module.exports = {
  getAll: (page, limit) => { //DONE
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

  findStyles: (productId) => { //STILL TO DO
    return db.query(`SELECT json_agg(SELECT id AS style_id, name, original_price, sale_price, default_style AS "default\?"
    FROM styles WHERE product_id = $1) AS results FROM `, [productId])
    // return db.query(`SELECT id AS style_id, name, original_price, sale_price, default_style AS "default\?"
    // FROM styles WHERE product_id = $1`, [productId])
  },

  findRelated: (productId) => { //DONE
    return db.query(`SELECT json_agg(related_product_id) AS related_ids FROM related_products WHERE current_product_id = $1`, [productId])
  },

  findCart: (sessionId) => { //DONE
    return db.query('SELECT product_id AS sku_id, quantity as count FROM cart WHERE user_session = $1 AND active = true', [sessionId])
  },

  addToCart: (sessionId, skuId) => { //DONE
    return db.query(`INSERT INTO cart VALUES ($1, $2, true, 1) ON CONFLICT (user_session, product_id) DO UPDATE SET quantity = (cart.quantity + 1)`, [sessionId, skuId])
  }
}