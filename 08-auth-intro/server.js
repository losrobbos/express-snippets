import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express();

// REGISTER MIDDLEWARE
app.use( express.json() ) // parse incoming bodies => req.body
app.use( cookieParser() ) // parse incoming cookies => req.cookies

// ALLOW FRONTENDs ON OTHER PORT TO CONNECT TO US + SENDING COOKIES ALONG 
app.use( cors() )


app.get('/', (req, res) => {
  res.send(`<h2>Authentication - Let's check it out, bro...</h2>`);
});

app.get('/cookies', (req, res) => {
  res.json( { cookies: req.cookies } )
})

// indentify user
// create / issue a token
app.get('/login', (req, res) => {
  
  let userFound = { _id: "12345", username: 'losrobbos' } 

  let token = "someHolyTicket"

  // prepare a cookie and send it back to fronend
  const sessionTimeInSecs = 1000*60*3 // => 60 seconds session
  res.cookie("token", token, { maxAge: sessionTimeInSecs, httpOnly: true } ) // attach the ticket to a cookie in the response

  res.json( userFound )

})

// create security guard which will protect confidential routes
const authenticate = (req, res, next) => {

  if(!req.cookies.token) {
    // throw new Error("You dont have a token!")
    return next( new Error("You do not have a token! Get outta herrreeee!") )
  }

  next() // forward user to desired destination
}

// => /secret => authenticate (=security guard) => controller

// should just be accessible by authenticated users
app.get('/secret', authenticate, (req, res) => {
  res.json({ message: "You got the holy data!" })
})

// GENERAL ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message})
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}!`);
});

//Run app, then load http://localhost:5000 in a browser to see the output.
