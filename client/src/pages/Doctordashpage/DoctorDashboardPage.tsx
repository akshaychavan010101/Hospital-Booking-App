import { useState } from 'react';
import DoctorDashboard from '../../components/doctorDashboard/DoctorDashboard'
import DoctorSidebar from '../../components/doctorDashboard/DoctorSidebar';


function DoctorDashboardPage() {

    const [Profile, setProfile] = useState(true);
    const [Patients, setPatients] = useState(false);
    const [Appointments, setAppointments] = useState(false);

    interface Myprops {
        Profile: boolean;
        Patients: boolean;
        Appointments: boolean;
    }

    const state: Myprops = {
        Profile: Profile,
        Patients: Patients,
        Appointments: Appointments
    }




    const props = {
        setProfile,
        setPatients,
        setAppointments
    }



    return (
        <div>
            <DoctorSidebar {...props} />
            <DoctorDashboard {...state}/>
        </div>
    )
}

export default DoctorDashboardPage