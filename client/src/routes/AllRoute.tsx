// import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../pages/home/HomePage'
import LoginPage from '../pages/login/LoginPage'
import SignupPage from '../pages/signup/SignupPage'
import NotFoundPage from '../pages/NotFound/NotFoundPage'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import UserDashboardPage from '../pages/user/UserDashboardPage'
import Ourdoctors from '../pages/OurDoctors/OurDoctorsPage'
import ServicePage from '../pages/services/ServicePage'
import AppointmentPage from '../pages/Appointment/AppointmentPage'
import DotorDetailsPage from '../pages/DoctorDetails/DotorDetailsPage'
import Notification from '../pages/notifications/Notification'

function AllRoute() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/user/login" element={<LoginPage/>} />
      <Route path="/user/signUp" element={<SignupPage/>} />
      <Route path="/user/dashboard" element={<UserDashboardPage/>} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage/>} />
      <Route path="/ourdoctors" element={<Ourdoctors/>} />
      <Route path="/services" element={<ServicePage/>} />
      <Route path="/appointment" element={<AppointmentPage/>} />
      <Route path="/doctordetails" element={<DotorDetailsPage/>} />
      <Route path="/notifications" element={<Notification/>} />
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default AllRoute