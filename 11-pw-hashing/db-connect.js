import mongoose from 'mongoose'

const MONGO_URI = "mongodb://localhost/users_db-48-2?retryWrites=true&w=majority"

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => console.log("Connection to database established!"))
.catch((err) => console.log("[ERROR] Connection failed!", err.message))