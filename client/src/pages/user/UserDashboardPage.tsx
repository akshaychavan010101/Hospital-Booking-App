import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar'
import UserDashboard from '../../components/userDashboard/UserDashboard'

function UserDashboardPage() {
  
  const [profile, setProfile] = useState(false);
  const [appointments, setAppointments] = useState(false);

  interface Myprops {
    profile: boolean;
    appointments: boolean;
  }

  const state : Myprops = {
    profile: profile,
    appointments: appointments
  }

  const props = {
    setProfile,
    setAppointments
  }
  
  return (
    <div>
      <Sidebar {...props} />
      <UserDashboard {...state}/>
    </div>
  )
}

export default UserDashboardPage