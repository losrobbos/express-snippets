import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import User from './models/User.js'
// establish connection to database
import './db-connect.js'


const app = express() // create me the API

// MIDDLEWARES

// prepare API to receive little BODIES ! (req.body)
app.use( express.json() ) // => this parses incoming JSON into => req.body
app.use( cors() ) // allow access to our API from frontends
app.use( morgan("dev") ) // logs all accesses to routes to the terminal


// ROUTES

// HOME route: http://localhost:5000
app.get("/", (req, res) => {
  res.send(`
    <h1>Hello from users API!</h1>
    <a href="/users">/users</a>
  `)
})

// X GET ALL: User.find() // GET ALL data
app.get("/users", async (req, res) => {

  const users = await User.find() // returns me ALL users in users collection
  res.json( users ) // send back ALL users from DB
})

// GET single user from database
app.get("/users/:id", async (req, res, next) => {

  const { id } = req.params // pluck out id parameter!

  try {
    const user = await User.findById( id )
    res.json( user ) // send single user back
  }
  // Error case, e.g. ID format wrong
  catch(err) { 
    next( err ) // forward error to my central error manager
  }
  
})

// X CREATE new user in database
app.post("/users", async (req, res) => {

  const body = req.body // receive body data

  // create user in database with the BODY data sent to us
  try {
    const userNewDb = await User.create( body )
    res.json( userNewDb ) // send created user back
  }
  catch(err) {
    next(err)
  }

})

// DELETE an existing item by ID
app.delete("/users/:id", async (req, res) => {

  const { id } = req.params

  // delete entry with given ID from database (=> collection users)
  try {
    const userDeleted = await User.findByIdAndDelete( id )
    res.json( userDeleted )
  }
  catch(err) {
    next(err)
  }
})


// UPDATE an EXISTING item
// Only request where we get data from TWO channels => req.params & req.body
app.put( "/users/:id", async (req, res) => {

  const { id } = req.params
  const userData = req.body

  // params => id to update
  // body => DATA to update (=fields)

  // find user by the ID and OVERWRITE with given fields
  try {
    const userUpdated = await User.findByIdAndUpdate( 
      id, userData, 
      { new: true }  // this makes mongoose returning the UPDATED version of the document
    )
    res.json( userUpdated )
  }
  catch(err) {
    next(err)
  }

})

// LAST RESORT: CENTRAL ERROR HANDLER
// HANDLE ALL ERRORS OF THE API in case THEY ARE NOT HANDLED ANYWHERE ELSE
app.use( (err, req, res, next) => {

  console.log( err ) // log the error to the terminal => so we get details on line numbers

  res.status(400).json({
    error: err.message // just forward MINIMAL information back to the user
  })

})

// FULL CRUD against API

const PORT = 5000
app.listen( PORT, () => {
  console.log(`API started up on http://localhost:${PORT}`) 
})
