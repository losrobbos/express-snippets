import mongoose from 'mongoose'

const MONGO_URI = "mongodb+srv://rob123:rob123@robclusterunlimited.3dzba.mongodb.net/teachers_db"

// connecting to MONGODB in the clouds...
mongoose.connect( MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then( () => console.log("Connection successful!") )
.catch(err => console.log("Connection SUCKS!", err.message))

