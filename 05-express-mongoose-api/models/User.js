import mongoose from 'mongoose'
const { Schema, model } = mongoose

// SETUP A MODEL + SCHEMA

// SCHEMA => rules for a document !
// MODEL => manager for one TYPE of document! (e.g. users)

const UserSchema = new Schema({
  // unique => just insertion of UNIQUE items allowed for field "username"
  // importnt: unique CONSTRAINT is actually the only rule that is stored on DB side!
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  isAdmin: { type: Boolean, default: false }
}, 
{
  versionKey: false // default: true => this creates the nasty __v thing
}
)

// Unique => constraint => limiting rule for data entry
// losrobbos => losrobbos twice =>  this will get rejected!

// model function gets a schema => creates now a manager (=model)
const User = model('User', UserSchema)
// User => Collection "users" in database!
// User => "lowercases" it and pluralizes it => users
// Product => product => products => collection: products

export default User