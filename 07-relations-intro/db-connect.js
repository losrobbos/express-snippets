import mongoose from 'mongoose'

export const connectDb = () => {

  const strConn = process.env.MONGO_URI || "mongodb://localhost/my_todos_db"
  
  mongoose.connect(strConn, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("Connection to database established!"))
  .catch((err) => console.log("[ERROR] Connection failed!", err.message))

}  
