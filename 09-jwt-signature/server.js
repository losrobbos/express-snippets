import jwt from "jsonwebtoken"

const JWT_SECRET = "holyCrapSecret"
// const JWT_SECRET = "snif" => caution! crackable within seconds! 
// => 4 charaters => 4 byte

// reasonable SECRET length => min: 256 => even better: 512

const obj1 = { username: "rob" }
const obj2 = { username: "rob" }

const token1 = jwt.sign( obj1, JWT_SECRET ) // => HASH (JWT TOKEN)
const token2 = jwt.sign( obj2, JWT_SECRET )


console.log()

console.log( "Token 1: ", token1 )

console.log()

console.log( "Token 2: ", token2 )

console.log()
