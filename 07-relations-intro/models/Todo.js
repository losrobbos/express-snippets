import mongoose from "mongoose"

const { Schema, model } = mongoose

const TodoSchema = new Schema({
  text: { type: String, required: true },
  status: { type: Boolean, default: false }, // default: Todo open  
  // create REFERENCE to a user
  userId: { 
    type: Schema.Types.ObjectId, // typically used for referencing IDs in ANOTHER collection! 
    ref: 'User'  // tell mongoose who is the manager for grabbing users!
  }
}, {
  versionKey: false // => __v => we dont give a shi***
})

const Todo = model("Todo", TodoSchema)

export default Todo