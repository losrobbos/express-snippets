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

app.get("/users", async (req, res) => {
  const users = await User.find()
  res.json( users )
})

// Challenge: How to get user specific todos??????????

app.get("/users/:id", async (req, res) => {
  const user = await User.findById( req.params.id )
  res.json( user )
})

app.get("/users/:id/todos", async (req, res) => {

  // TODO: grab todos of a specific user


})


// seed in some data => always wipe out old data first!
  // just performed during DEVELOPMENT!
  // typically done after schema changes!
  // get some initial data for our routes
app.get("/seed", async (req, res) => {

  // DELETE all current data
  await Todo.deleteMany()
  await User.deleteMany()

  const users = [
    { name: "Wasabis" },
    { name: "Losrobbos" },
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