import mongoose from 'mongoose' // CommonJS module
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

