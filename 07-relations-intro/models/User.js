import mongoose from 'mongoose'

const { Schema, model } = mongoose

// subschema for NESTED data
const ContactSchema = new Schema({
    email: { type: String, required: true},
    phoneNr: String,
    linkedin: String
}, {
  _id: false // => do not create IDs for nested contact info
}) // Do NOT create a model for this, pleaaaaaaase!

// rules for user object
const UserSchema = new Schema({
  name: { type: String, required: true },
  contactInfo: { type: ContactSchema }, // create own datatype
  // addresses: [ { street: String, city: String, country: String } ]
}, {
  versionKey: false // => __v => we dont give a shi***
})

// create user manager = model
const User = model("User", UserSchema) // => "users" in the database

export default User