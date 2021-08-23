// import express from 'express' // ES 6 modules
const express = require("express")   // CommonJS
const app = express() // generates me an API (instance)

// FAKE DATABASE
const arrTeachers = [
  { id: "1", name: "Alejandra" },
  { id: "2", name: "Ghassan" },
  { id: "3", name: "Mansour" },
  { id: "4", name: "Rob" },
  { id: "5", name: "Vasilis" },
]

// DEFINING CALL CENTER NUMBERS + AGENTS (=> ROUTES)

// ROUTE => /teachers
app.get("/teachers", (request, response) => {

  // response => RESPONSE UNDER CONSTRUCTION

  // CALL CENTER AGENT
  console.log("You want teachers, right??????")

  // SEND DATA BACK => use json() method for that
  response.json( arrTeachers )
})

// /teachers => ROUTE /1 => PARAM
// /teachers/5 => id=5 => result is stored in request.params => { id: "5" }
// /teachers/7 => id=7 => result is stored in request.params => { id: "7" }
app.get("/teachers/:id", (request, response) => {

  const { id } = request.params

  const teacherFound = arrTeachers.find( teacher => teacher.id === id )  

  // LAST OPERATION OF EVERY CALL CENTER AGENT => SEND THE FU**** RESPONSE
  response.json( teacherFound ) // produces and sends ACTIVELY a response back to the BROWSER
  // return teacherFound // this just exits the function

})

// app.get("/students", (request, response) => { // CONTROLLER
// })   

// SERVER => PORT 5000 => http://localhost:5000
app.listen( 5000, () => {
  console.log("API has started successfully on PORT 5000, buddhy")
}) // HIGHER ORDER FUNCTION => functions that get functions or callbacks as parameters

// REACT => pages => page components (Orders.jsx) => ROUTE 
