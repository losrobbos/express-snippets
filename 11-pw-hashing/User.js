import mongoose from "mongoose"
const { Schema, model } = mongoose

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true } // find against => leave out the PW!
}, 
{
  // hide fields from all OUTPUTs / reponses !
  toJSON: {
    transform: (original, returnedDoc) => {
      delete returnedDoc.password;
    }
  }
}
)

const User = model("User", UserSchema)

export default User
