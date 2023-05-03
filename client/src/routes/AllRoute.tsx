// import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../pages/home/HomePage'

function AllRoute() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='*' element/>
    </Routes>
  )
}

export default AllRoute