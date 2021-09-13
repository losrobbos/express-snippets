import mongoose from 'mongoose'

const { Schema, model } = mongoose

// rules for user object
const UserSchema = new Schema({
  name: { type: String, required: true }
}, {
  versionKey: false // => __v => we dont give a shi***
})

// create user manager = model
const User = model("User", UserSchema) // => "users" in the database

export default User