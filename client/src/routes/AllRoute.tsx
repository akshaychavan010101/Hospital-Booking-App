import { Route, Routes } from 'react-router'
import HomePage from '../pages/home/HomePage'
import LoginPage from '../pages/login/LoginPage'
import SignupPage from '../pages/signup/SignupPage'
import Ourdoctors from '../pages/OurDoctors/OurDoctorsPage'

function AllRoute() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/ourdoctors" element={<Ourdoctors/>}/>
      <Route path="/user/login" element={<LoginPage/>} />
      <Route path="/user/signUp" element={<SignupPage/>} />
      <Route path='*' element/>
    </Routes>
  )
}

export default AllRoute