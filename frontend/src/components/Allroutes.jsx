import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Home'
// import Containers from './Containers'
import Article from './Article'
export default function Allroutes() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/containers' element={<Article/>}/>
    </Routes>
  )
}
