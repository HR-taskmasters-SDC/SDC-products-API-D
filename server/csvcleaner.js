const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require("fs");
const Transform = require("stream").Transform;

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id'},
    { id: 'name', title: 'name' },
    { id: 'slogan', title: 'slogan' },
    { id: 'description', title: 'description' },
    { id: 'category', title: 'category' },
    { id: 'default_price', title: 'default_price' }
  ]
})