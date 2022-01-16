const { getAll, getOne, findStyles, findPhotos, findSkus, findRelated, findCart, addToCart } = require('./model.js');

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
    let finalResult = {};
    finalResult.product_id = product_id;
    let toplevel = [];

    findStyles(product_id)
    .then((data) => {
      finalResult.results = data.rows;
      return finalResult;
    })
    .then((result) => {
      result.results.forEach((style) => {
        let photoPromises = [];
        let skuPromises = [];
        photoPromises.push(findPhotos(style.style_id)
        .then((data) => {
          return data.rows;
        }))
        skuPromises.push(findSkus(style.style_id)
        .then((data) => {
          let fixer = {}
          return data.rows
        }))
        toplevel.push(
          Promise.all([...photoPromises, ...skuPromises])
          .then((data) => {
            style.photos = data[0];
            style.skus = {}
            data[1].forEach((item) => {
              style.skus[item.id] = {
                quantity: item.quantity,
                size: item.size
              }
            })
          })
        )
      })
    })
    .then(() => {
      Promise.all(toplevel)
      .then(() => {
        res.send(finalResult)
      })
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
    const sessionId = req.params;
    findCart(sessionId)
    .then((data) => {
      res.send(data.rows);
    })
    .catch( err => console.log(err));
  },

  postCart: (req, res) => {
    const sessionId = req.sessionID;
    const { sku_id } = req.params;
    addToCart(sessionId, sku_id)
    .then((data) => {
      res.send(data.rows);
    })
    .catch( err => console.log(err));
  }
}