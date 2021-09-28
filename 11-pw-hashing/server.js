import express from 'express';
import cors from 'cors'
import './db-connect.js'
import User from './User.js'

const app = express();

app.use( cors() )
app.use( express.json( ) )

app.get('/', (req, res) => {
  res.json({ message: "Hello from Users API" });
});

app.post("/signup", async (req, res, next) => {

  const userCreated = await User.create(req.body)
  res.json( userCreated )
})

app.post("/login", async (req, res, next) => {

  const {email, password} = req.body
  const foundUser = await User.findOne({ email, password })

  if(!foundUser) {
    next(new Error("User does not exist"))
  }

  res.json( foundUser )
})

const PORT = 5000
app.listen(PORT, () => {
  console.log('API listening on port ', PORT);
});

//Run app, then load http://localhost:port in a browser to see the output.