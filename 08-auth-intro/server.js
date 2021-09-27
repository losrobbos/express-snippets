import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

const app = express();

const JWT_SECRET = "myHolySecret" // => on change => all granted tickets become invalid

const users = [
  { _id: "u1", name: "Aimee" },
  { _id: "u2", name: "Mo" }
]

const todos = [
  { _id: "t1", text: "Show some auth intro", userId: "u1" },
  { _id: "t2", text: "Answer Norman's questions accurately & slowly", userId: "u1" },
  { _id: "t3", text: "Let's make an extended break soon", userId: "u2" },
]

// ALLOW FRONTENDs ON OTHER PORT TO CONNECT TO US + SENDING COOKIES ALONG 

// app.use( cors() ) // => allows access from EVERYONE !!!! http://localhost:3000 http://google.com

app.use( cors( {
  origin: 'http://localhost:3000', // only this domain / url can talk to us!
  credentials: true // => accept incoming cookies from that domain above!
} )) // allow access just from specific Frontend URL => requirement for sending cookies!

// REGISTER MIDDLEWARE
app.use( express.json() ) // parse incoming bodies => req.body
app.use( cookieParser() ) // parse incoming cookies => req.cookies


app.get('/', (req, res) => {
  res.send(`<h2>Authentication - Let's check it out, bro...</h2>`);
});

app.get('/cookies', (req, res) => {
  res.json( { cookies: req.cookies } )
})

// indentify user
// create / issue a token
app.get('/login', (req, res) => {

  let userFound = users[1] // log this user in hardcoded

  // sign => create a ticket
  // verify => check if ticket is valid!
  let token = jwt.sign( userFound, JWT_SECRET, { expiresIn: '3m' } )
  // ==> eywhwhaza292kaja => box: { eykwkwkwiw } => send this box to frontend

  console.log( token )

  // prepare a cookie and send it back to fronend
  const sessionTimeInSecs = 1000*60*3 // => 60 seconds session
  res.cookie("token", token, { maxAge: sessionTimeInSecs, httpOnly: true } ) // attach the ticket to a cookie in the response

  res.json( userFound )

})

// create security guard which will protect confidential routes
const authenticate = (req, res, next) => {

  const token = req.cookies.token // box: { token: ey12384746565 }

  if(!token) {
    // throw new Error("You dont have a token!")
    return next( new Error("You do not have a token! Get outta herrreeee!") )
  }

  // if somebody presents us a token => VERIFY its signature!
  try {
    const userDecoded = jwt.verify( token, JWT_SECRET )

    req.user = userDecoded // store user info in request

    console.log("Data decoded from token:", userDecoded)
    next() // forward user to desired destination
  }
  catch(err) {
    next( err )
  }

}

// => /secret => authenticate (=security guard) => controller

// should just be accessible by authenticated users
app.get('/secret', authenticate, (req, res) => {
  res.json({ message: "You got the holy data!" })
})

app.get("/todos", authenticate, (req, res) => {

  console.log( req.user )

  const userTodos = todos.filter( todo => todo.userId == req.user._id )

  res.json( userTodos )
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
