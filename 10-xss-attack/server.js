import express from 'express'
import cookieParser from 'cookie-parser'

const app = express();

app.use( cookieParser() ) // parse incoming cookies
app.use( express.json() ) // parse incoming body

// HOME ROUTE
app.get('/', (req, res) => {
  res.send(`
    <h2>Attack me, please...</h2>
    <a href="/products">Products (JSON)</a><br />
    <a href="/products/html">Products (HTML)</a>
  `);
});


// PRODUCTS "DATABASE"
const products = [ 
  { type: "Oven", name: "Owen", price: 199.95 },
  { type: "Dishwasher", name: "Dishy", price: 299.95 },
  { type: "Sink", name: "Sindy", price: 149.95 } 
]

app.get('/products', ( req, res, next ) => {
  res.json(products)
})

app.get('/products/html', (req, res, next) => {

  // map over products and create fancy HTML
  let productsListHtml = products.map((product => (
    `<li>Name: ${product.name}, Price: ${product.price} </li>`
  ))).join('')


  let productsPage = `
    <h1>Our list of Products</h1>
    <ul>${productsListHtml}</ul>
  `
  res.send(productsPage)
})

// XSS attack (Cross Site Scripting) goes here...
app.post('/products', ( req, res, next ) => {

  const productNew = { 
    type: req.body.type, 
    name: req.body.name, 
    price: req.body.price 
  }

  products.push(productNew)

  res.json(productNew)
})

// STARTUP SERVER
app.listen(5000, () => {
  console.log('Api listening on http://localhost:5000!');
});

//Run app, then load http://localhost:5000 in a browser to see the output.

