import './db-connect.js'
import express from 'express'
import cors from 'cors'
import Todo from './models/Todo.js'
import User from './models/User.js'

const app = express()

app.use( cors() ) // allow access from JavaScript outside our API
app.use( express.json() )

app.get("/todos", async (req, res) => {
  const todos = await Todo.find()
  res.json( todos )
})

app.get("/todos/:id", async (req, res) => {
  // POPULATE => used to get parent & related data in ONE go! 
  //=> advantage: just one fetch call from frontend needed
  const todo = await Todo.findById( req.params.id )
    .populate("userId") // => look up that userId from users collection and replace ID by user document

  // result will have userId replaced by user object => userId: { _id: 1234, name: "XYZ" }
  res.json( todo )
})

// Frontend wants to get LIST of users
app.get("/users", async (req, res) => {
  const users = await User.find()
  res.json( users )
})

// Grab just single user for maybe frontend profile
app.get("/users/:id", async (req, res) => {
  const user = await User.findById( req.params.id )
  res.json( user )
})


// Grab all user related data => todos
app.get("/users/:id/todos", async (req, res) => {

  const { id } = req.params // id => string

  // QUERY => .find() => findOne() => findById() 
  const userTodos = await Todo.find({ userId: id }) // search RELATED data

  res.json( userTodos )

})


// seed in some data => always wipe out old data first!
  // get some initial data for our routes
  // typically just performed during DEVELOPMENT! (to create some fake data)
  // typically done after each (breaking) schema change!
app.get("/seed", async (req, res) => {

  // DELETE all current data
  await Todo.deleteMany()
  await User.deleteMany()

  const users = [
    { name: "Wasabis" },
    { name: "Losrobbos", 
      contactInfo: { 
        email: "losrobbos@edu.com",
        phoneNr: "+49123456789",
        linkedin: "https://linkedin.com/robertristock"
      } 
    },
  ]

  // Create users FIRST so we got some users with IDs
  const usersDb = await User.create(users)

  // bring "naked" array into database => todos collection
  const todos = [
    { text: "Seed in some stuff", userId: usersDb[0] },
    { text: "Show blog sample in block 2", userId: usersDb[0] },
    { text: "Trim that beard and keep it trimmed!", userId: usersDb[1] }
  ]


  // bring data into DB
  const todosDb = await Todo.create(todos)

  res.json({
    message: `Created ${todosDb.length} todos & ${usersDb.length} users`
  })

})

const PORT = 5000
app.listen(5000, () => {
  console.log(`API started on http://localhost:${PORT}`)
})