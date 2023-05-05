// import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../pages/home/HomePage'
import LoginPage from '../pages/login/LoginPage'
import SignupPage from '../pages/signup/SignupPage'
import NotFoundPage from '../pages/NotFound/NotFoundPage'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import UserDashboardPage from '../pages/user/UserDashboardPage'

function AllRoute() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/user/login" element={<LoginPage/>} />
      <Route path="/user/signUp" element={<SignupPage/>} />
      <Route path="/user/dashboard" element={<UserDashboardPage/>} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage/>} />
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default AllRoute