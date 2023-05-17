import AdminDashboard from "../../components/admin/AdminDashboard";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import { useState } from "react";

function AdminDashboardPage() {
 
  const [Home, setHome] = useState(true);
  const [Admins, setAdmins] = useState(false);
  const [Patients, setPatients] = useState(false);
  const [Doctors, setDoctors] = useState(false);
  const [Appointments, setAppointments] = useState(false);

  interface Myprops {
    Home: boolean;
    Admins: boolean;
    Patients: boolean;
    Doctors: boolean;
    Appointments: boolean;
  }

  const state: Myprops = {
    Home: Home,
    Admins: Admins,
    Patients: Patients,
    Doctors: Doctors,
    Appointments: Appointments,
  };

  const props = {
    setHome,
    setAdmins,
    setPatients,
    setDoctors,
    setAppointments,
  };

  return (
    <div>
      {/* pass the above states as props to below components */}
      <AdminSidebar {...props} />
      <AdminDashboard {...state} />
    </div>
  );
}

export default AdminDashboardPage;
