const { getAll, getOne, findStyles, findRelated, findCart, addToCart } = require('./model.js');

module.exports = {
  getAllProducts: (req, res) => {
    const { page, count } = req.query;
    getAll(page, count)
    .then((data) => {
      res.send(data.rows);
    })
    .catch( err => console.log(err));
  },

  getOneProduct: (req, res) => {
    const { product_id } = req.params;
    getOne(product_id)
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch( err => console.log(err));
  },

  getStyles: (req, res) => {
    const { product_id } = req.params;
    findStyles(product_id)
    .then((data) => {
      res.send(data.rows);
    })
    .catch( err => console.log(err));
  },

  getRelated:(req, res) => {
    const { product_id } = req.params;
    findRelated(product_id)
    .then((data) => {
      res.send(data.rows[0].related_ids);
    })
    .catch( err => console.log(err));
  },

  getCart: (req, res) => {
    const sessionId = 'PLACEHOLDER';
    findCart(sessionId)
    .then((data) => {
      res.send(data.rows);
    })
    .catch( err => console.log(err));
  },

  postCart: (req, res) => {
    const sessionId = 'PLACEHOLDER';
    const { sku_id } = req.params;
    addToCart(sessionId, sku_id)
    .then((data) => {
      res.send(data.rows);
    })
    .catch( err => console.log(err));
  }
}