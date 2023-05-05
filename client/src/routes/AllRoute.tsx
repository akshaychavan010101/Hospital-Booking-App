// import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../pages/home/HomePage'
import LoginPage from '../pages/login/LoginPage'
import SignupPage from '../pages/signup/SignupPage'
import NotFoundPage from '../pages/NotFound/NotFoundPage'

function AllRoute() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/user/login" element={<LoginPage/>} />
      <Route path="/user/signUp" element={<SignupPage/>} />
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default AllRoute