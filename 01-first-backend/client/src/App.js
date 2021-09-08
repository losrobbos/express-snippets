import React, { useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/teachers'

function App() {

  const [teachers, setTeachers] = useState([
    { name: "Wasabis" },
    { name: "Losrobbos" },
  ])

  // load all teachers on button click
  const loadTeachers = (e) => {

    // GET call to backend to fetch all teachers
    fetch( API_URL )
    .then(res => res.json())
    .then(teachersApi => {
      console.log(teachersApi)
      // override our "hardcoded" teachers with the teachers list from API
        // so those will get displayed in the JSX below...
      setTeachers(teachersApi) 
    })
  } 
  
  // create card for every teacher
  const teacherListJsx = teachers.map((teacher, i) => (
    <div className="card" key={i}>
      <img className="card-image" 
        src={`https://source.unsplash.com/100x100/?avatar,${','.toString().repeat(i)}`} />
      <div className="card-body">{ teacher.name }</div>
    </div>
  )) 

  return (
    <div className="App">
      <h1>Teacher List</h1>
      <div className="teachers-list">
      { teacherListJsx }
      </div>
      <button onClick={loadTeachers}>LOAD TEACHERS</button>
    </div>
  );

}

export default App;
