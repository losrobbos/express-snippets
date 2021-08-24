import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [teachers, setTeachers] = useState([])  
  const [teacherNewName, setTeacherNewName] = useState("")

  useEffect(() => {
    // GET call to backend to fetch all teachers
    fetch('http://localhost:5000/teachers')
    .then(res => res.json())
    .then(teachersApi => {
      console.log(teachersApi)
      setTeachers(teachersApi)
    })
  }, [])

  // POST a new teacher to API
  const handleTeacherAdd = () => {

    let newTeacher = { name: teacherNewName }

    // POST call to create a new teacher in the API
    fetch('http://localhost:5000/teachers', {
      method: 'POST',
      headers: { "Content-Type": "application/json" }, // tell API we send JSON
      body: JSON.stringify( newTeacher )
    })
    .then(res => res.json())
    .then(newTeacherApi => {
      console.log( newTeacherApi )
      setTeachers( [...teachers, newTeacherApi] )
    } )
  }

  return (
    <div className="App">
      <h1>Teacher List</h1>

      <div className="teacher-add">
        <input name="name" 
          autoComplete="off"
          value={teacherNewName}
          onChange={ (e) => setTeacherNewName(e.target.value) } />
        <button onClick={ handleTeacherAdd }>ADD TEACHER</button>
      </div>

      <div className="teachers-list">
      { teachers.map((teacher, i) => (
        <div className="card" key={i}>
          {/* Fetch some random avatar from unsplash */}
          <img className="card-image" 
            src={`https://source.unsplash.com/100x100/?avatar,${','.toString().repeat(i)}`} />
          {/* Display teacher name */}
          <div className="card-body">{ teacher.name }</div>
        </div>
      )) }
      </div>
    </div>
  );

}

export default App;
