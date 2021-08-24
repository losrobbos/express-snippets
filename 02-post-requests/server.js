// import express from 'express' // ES 6 modules
const express = require("express")   // CommonJS
const app = express() // generates me an API (instance)
const cors = require("cors")

// FAKE DATABASE
const arrTeachers = [
  { id: "1", name: "Alejandra" },
  { id: "2", name: "Ghassan" },
  { id: "3", name: "Mansour" },
  { id: "4", name: "Rob" },
  { id: "5", name: "Vasilis" },
]

// BODY PARSING 
// => API receives Body
// => API by default is lazy and will NOT parse that thing automatically!
// => We need to tell the API, that the received data is JSON and to parse it automatically
// => API now parses incoming JSON into a special variable => request.body
// => examplte - parses incoming JSON into: { name: "Leandro" }
// request.body will now be available in our routes for further processing...
app.use( express.json() )

app.use( cors() ) // allow access to API from OUTSIDE (=fetch)

// DEFINING CALL CENTER NUMBERS + AGENTS (=> ROUTES)

// ROUTE => /teachers
app.get("/teachers", (request, response) => {

  console.log("[GET] /teachers called")

  // SEND DATA BACK => use json() method for that => will send RESPONSE to BROWSER!
  response.json( arrTeachers )
})

// POST ROUTE => route that listenes for POST requests
app.post("/teachers", (request, response) => {

  console.log("[POST] /teachers called")

  const { name } = request.body // extract name from the body sent to us 

  // handle the error case: no name for new teacher was given
  if(!name) {
    return response.json( { 
      error: "What the fuck are you doing here? Data, or piss off!" 
    })
  }

  // reject duplicate teacher
  const teacherFound = arrTeachers.find( teacher => teacher.name === name )

  if(teacherFound) {
    return response.json( { 
      error: "We already got that one. Thanks for your support anyways!" 
    })
  }

  // create new teacher object from sent body data
  const teacherNew = { ...request.body, id: Date.now().toString() } // merge body with id => { name: <name>, id: ...DateNow... }

  // add new teacher to teacher array
  arrTeachers.push( teacherNew ) 

  // return the created RESOURCE
  response.json( teacherNew ) 

})

// /teachers => ROUTE /1 => PARAM
// /teachers/5 => id=5 => result is stored in request.params => { id: "5" }
// /teachers/7 => id=7 => result is stored in request.params => { id: "7" }
app.get("/teachers/:id", (request, response) => {

  const { id } = request.params

  const teacherFound = arrTeachers.find( teacher => teacher.id === id )  

  // LAST OPERATION OF EVERY CALL CENTER AGENT => SEND THE FU**** RESPONSE
  response.json( teacherFound ) // produces and sends ACTIVELY a response back to the BROWSER
})

// SERVER => PORT 5000 => http://localhost:5000
app.listen( 5000, () => {
  console.log("API has started successfully on PORT 5000, buddhy")
}) // => HIGHER ORDER FUNCTION => functions that get functions or callbacks as parameters

