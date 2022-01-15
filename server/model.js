const db = require('./database');

module.exports = {
  getAll: (page, limit) => { //DONE
    return db.query(`SELECT * FROM product LIMIT $2 OFFSET $1`, [((page * limit) - limit), limit])
  },

  getOne: (productId) => {
    return db.query( //STILL TO DO
      `(SELECT json_agg(features) FROM (
        SELECT DISTINCT feature, value FROM features WHERE product_id = $1
      ) AS features)`,
    [productId])
  },

  findStyles: (productId) => { //STILL TO DO
    return db.query(`SELECT * FROM styles WHERE product_id = $1`, [productId])
  },

  findRelated: (productId) => { //DONE
    return db.query(`SELECT json_agg(related_product_id) AS related_ids FROM related_products WHERE current_product_id = $1`, [productId])
  },

  findCart: (sessionId) => {

  },

  addToCart: (sessionId, skuId) => {

  }
}