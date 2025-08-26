import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage'
import CreatePage from './pages/createPage'
import NoteDetails from './pages/noteDetails'
function App() {
  
  return (
    <>
      
      <Routes>
          <Route path='/' element ={<Home/>}/>
          <Route path = '/create' element= {<CreatePage/>}></Route>
          <Route path = '/note/:id' element = {<NoteDetails/>}></Route>
      </Routes> 
    </>
  )
}

export default App