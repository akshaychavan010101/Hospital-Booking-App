

import RenderAppointments from "../admin/RenderAppointments";
import RenderPatients from "../admin/RenderPatients";
import DoctorDetails from "../doctorDetails/DoctorDetails";
import styles from "./DoctorDashboard.module.css";

// import Adminstat from "./Adminstat";
// import Renderadmin from "./Renderadmin";
// import RenderDoctor from "./RenderDoctor";
// import RenderPatients from "./RenderPatients";
// import RenderAppointments from "./RenderAppointments";


interface Myprops {
    Profile: boolean;
    Patients: boolean;
    Appointments: boolean;
}


function DoctorDashboard(props: Myprops) {


    // window.onload = function () {
    //     const isAdmin = sessionStorage.getItem("isAdmin");
    //     if (isAdmin !== "admin") {
    //         window.location.href = "http://localhost:5173/";
    //     }
    // };

    const { Profile, Patients, Appointments } = props;

    return (
        <div className={styles.dashContainer}>
            {Profile ? (
                <DoctorDetails />
            ) : Patients ? (
                <RenderPatients />
            ) : Appointments ? (
                <RenderAppointments/>
            ) : (
                <p>Oops...😥</p>
            )}
        </div>
    );
}
export default DoctorDashboard
