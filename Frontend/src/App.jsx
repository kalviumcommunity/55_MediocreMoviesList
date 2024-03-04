import './App.css'
import Home from './Components/Home.jsx'
import Landing from './Components/Landing.jsx'
import { Route,Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element = {<Landing/>} />
        <Route path='/Home' element = {<Home/>} />
      </Routes>
    </>
  )
}

export default App