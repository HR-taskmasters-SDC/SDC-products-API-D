const db = require('./database');

module.exports = {
  getAll: (page, limit) => {
    return db.query(`SELECT * FROM product LIMIT $2 OFFSET $1`, [((page * limit) - limit), limit])
  },

  getOne: (productId) => {
    return db.query(`SELECT * FROM product JOIN features ON product.id = product_id WHERE product.id = $1`, [productId])
  },

  findStyles: (productId) => {
    return db.query(`SELECT * FROM styles WHERE product_id = $1`, [productId])
  },

  findRelated: (productId) => {

  },

  findCart: (sessionId) => {

  },

  addToCart: (sessionId, skuId) => {

  }
}