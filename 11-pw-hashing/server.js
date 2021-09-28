import express from 'express';
import cors from 'cors'
import './db-connect.js'
import User from './User.js'
import bcrypt from 'bcryptjs'

const app = express();

app.use( cors() )
app.use( express.json( ) )

app.get('/', (req, res) => {
  res.json({ message: "Hello from Users API" });
});

app.post("/signup", async (req, res, next) => {

  const userData = { ...req.body }

  // salt round = 10 => the password will have 10 rounds (!) of hashing!
  userData.password = bcrypt.hashSync( userData.password, 10 ) // salt round => cost factor!

  const userCreated = await User.create(userData)
  res.json( userCreated ) // => res.json => toJSON()
})

app.post("/login", async (req, res, next) => {

  const {email, password} = req.body // password: hello123
  const foundUser = await User.findOne({ email })

  // a record by ID: findById
  // filter for ONE record by other criteria => findOne

  if(!foundUser) {
    return next(new Error("User does not exist"))
  }

  // user found by email!!

  // check password => compare PLAIN password of user with HASH

  // hello123
  // bcrypt => hello123 => hash => 12234565 => 12234565 => LOGIN!
  const loginSuccessful = bcrypt.compareSync( password, foundUser.password )

  if(!loginSuccessful) {
    return next( new Error("Passwords don't match, freak") )
  }
 
  res.json( foundUser ) 
})

// GENERAL ERROR HANDLER
app.use( (err, req, res, next) => {
  res.status(400).json({ error: err.message })
})

const PORT = 5000
app.listen(PORT, () => {
  console.log('API listening on port ', PORT);
});

//Run app, then load http://localhost:port in a browser to see the output.