import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {Homepage, NavBar  } from './components'

const App = () => {
  return (
    <div >
    <NavBar/>
      <Routes>
        <Route exact path='/' element={<Homepage/>} />
      </Routes>
    </div>
  )
}

export default App
