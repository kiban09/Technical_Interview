import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Default from '../Pages/Default'
import Home from '../Pages/Home'

function Router() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/' element={<Default/>}/>
    </Routes>
  )
}

export default Router