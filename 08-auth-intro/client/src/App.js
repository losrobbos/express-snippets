import './App.css';
import axios from 'axios'
import { useState } from 'react'

axios.defaults.baseURL = 'http://localhost:5000' // = API URL
axios.defaults.withCredentials = true // attach browser cookies in all your requests to API

function App() {

  const [ message, setMessage ] = useState("")
  const [ error, setError ] = useState("")

  const showError = (err) => {
    if(err.response) {
      const errorMsg = err.response.data.error
      setError(errorMsg)
    }
    else {
      setError("API not available...")
    }
  }

  const login = async () => {
    try {
      const response = await axios.get('/login')
      console.log(response.data)
      setError("")
      setMessage(`Logged you in, ${response.data.username}`)
    }
    catch(err) {
      showError(err)
    }
  }

  const getSecret = async () => {

    try {
      const response = await axios.get('/secret')
      setError('')
      setMessage(response.data.message)
    }
    catch(err) {
      showError(err)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={ login }>Login</button>
        </div>
        <div>
          <button onClick={ getSecret }>Show secret</button>
        </div>
        { error ? 
          <div className="error">{error}</div> : 
          <div className="result">{message}</div>
        }
      </header>
    </div>
  );
}

export default App;
