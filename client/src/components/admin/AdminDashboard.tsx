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

    const { Home, Admins, Patients, Doctors, Appointments } = props;

    // const [data, setData] = useState([]);
    return (
        <div className={styles.dashContainer}>
            {Home ? <Adminstat /> : Admins ? <Renderadmin /> : Patients ? <RenderPatients /> : Doctors ? <RenderDoctor /> : Appointments ? <RenderAppointments /> : <p>Oops...😥</p>}
        </div>
    );
}

