import './App.css'
import Home from './Components/Home.jsx'
import Landing from './Components/Landing.jsx'
import Form from './Components/Form.jsx'
import UpdateMovieForm from './Components/UpdateMovieForm.jsx'
import { Route,Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element = {<Landing/>} />
        <Route path='/Home' element = {<Home/>} />
        <Route path='/Form' element = {<Form/>} />
        <Route path='/update/:id' element = {<UpdateMovieForm/>} />
      </Routes>
    </>
  )
}

export default App