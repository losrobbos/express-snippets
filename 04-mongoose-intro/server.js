import mongoose from 'mongoose' // CommonJS module
import User from './models/User.js'
const { connect } = mongoose // pluck out what we need

const MONGO_URI = "mongodb://localhost/users_db"

// Connection is established at BEGINNING of our program
// and stays alive (=> hangs around waiting for DB operations)
connect( MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected, bro! Good job"))
.catch((err) => console.log("Connected screwed", err.message))

// Mogongoose CRUD methods [CRUD = Create, Read, Update, Delete)
// User.find() // GET ALL data
// User.create() // CREATE a new item
// User.findByIdAndUpdate() // UPDATE an existing item
// User.findByIdAndDelete() // DELETE an existing item

// User.create => is like a fetch POST request

// actually creates... 
// => the DATABASE (users_db)
// => the COLLECTION (users)
// => the DOCUMENT (= one concrete user)
User.create({
  username: "mo",
  password: "mo123",
  age: 38, // => the perfect age! congratulations!
  isAdmin: true
})
.then(user => console.log( user ) )
.catch(err => console.log("[ARRRRGH]", err.message))
