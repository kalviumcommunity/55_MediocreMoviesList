import './App.css'
import Home from './Components/Home.jsx'
import Landing from './Components/Landing.jsx'
import Form from './Components/Form.jsx'
import UpdateMovieForm from './Components/UpdateMovieForm.jsx'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import { Route,Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element = {<Landing/>} />
        <Route path='/home' element = {<Home/>} />
        <Route path='/form' element = {<Form/>} />
        <Route path='/update/:id' element = {<UpdateMovieForm/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/signup' element = {<Signup/>} />
      </Routes>
    </>
  )
}

export default App