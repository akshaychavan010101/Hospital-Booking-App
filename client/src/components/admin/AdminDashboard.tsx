import styles from "./AdminDashboard.module.css";


import Adminstat from "./Adminstat";
import Renderadmin from "./Renderadmin";
import RenderDoctor from "./RenderDoctor";
import RenderPatients from "./RenderPatients";
import RenderAppointments from "./RenderAppointments";


interface Myprops {
    Home: boolean;
    Admins: boolean;
    Patients: boolean;
    Doctors: boolean;
    Appointments: boolean;
}

export default function AdminDashboard(props: Myprops) {



    // function patientDisplay(){
    //     useEffect(()=>{
    //         fetch(`${baseURL}/users/all-users`)
    //         .then((res)=>{
    //             return res.json()
    //         })
    //         .then((data)=>{
    //             console.log(data)
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         });
    //     })
    //     return(
    //         <div>
    //             <h1>Admin</h1>
    //         </div>
    //     )
    // }

    // function doctorsDisplay(){
    //     useEffect(()=>{
    //         fetch(`${baseURL}/doctors/all-doctors`)
    //         .then((res)=>{
    //             return res.json()
    //         })
    //         .then((data)=>{
    //             console.log(data)
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         });
    //     })
    //     return(
    //         <div>
    //             <h1>Admin</h1>
    //         </div>
    //     )
    // }

    // function appointmentsDisplay(){
    //     useEffect(()=>{
    //         fetch(`${baseURL}/appointments/all-appointments`)
    //         .then((res)=>{
    //             return res.json()
    //         })
    //         .then((data)=>{
    //             console.log(data)
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         });
    //     })
    //     return(
    //         <div>
    //             <h1>Admin</h1>
    //         </div>
    //     )
    // }

    const { Home, Admins, Patients, Doctors, Appointments } = props;

    // const [data, setData] = useState([]);
    return (
        <div className={styles.dashContainer}>
            {Home ? <Adminstat /> : Admins ? <Renderadmin /> : Patients ? <RenderPatients /> : Doctors ? <RenderDoctor /> : Appointments ? <RenderAppointments /> : <p>Oops...😥</p>}
        </div>
    );
}

