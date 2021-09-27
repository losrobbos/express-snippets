import express from 'express'
import cors from "cors"

const app = express();

// REGISTER MIDDLEWARE
app.use( express.json() ) // parse incoming bodies => req.body

// ALLOW FRONTENDs ON OTHER PORT TO CONNECT TO US + SENDING COOKIES ALONG 
app.use( cors() )


app.get('/', (req, res) => {
  res.send(`<h2>Authentication - Let's check it out, bro...</h2>`);
});

app.get('/cookies', (req, res) => {
  res.json({ message: "Show some cookies here..." })
})

// indentify user
// create / issue a token
app.get('/login', (req, res) => {
  let userFound = { _id: "12345", username: 'losrobbos' } 
  res.json(userFound)
})

// should just be accessible by authenticated users
app.get('/secret', (req, res) => {
  res.json({ message: "You got the holy data!" })
})

// TODO: create security guard which will protect confidential routes


// GENERAL ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message})
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}!`);
});

//Run app, then load http://localhost:5000 in a browser to see the output.
