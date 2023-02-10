const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});


// product one2one with category
// product = parent, cat = child

// product has many2many with tags
// one product belongs to multiple tags
// and mult tags can belong to mult products

// steps:
// 1. make sure you can connect to sequelzie
// 2. correct models
// 3. correct routes
// 4. join tables together

// each cat has mult products
// assign cat_id to product

// each product has mult tag

// product belongs to category

