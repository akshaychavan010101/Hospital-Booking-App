// import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../pages/home/HomePage'
import Login from '../components/login/Login'
import SignupCard from '../components/signUp/SignUp'

function AllRoute() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/user/login" element={<Login/>} />
      <Route path="/user/signUp" element={<SignupCard/>} />
      <Route path='*' element/>
    </Routes>
  )
}

export default AllRoute