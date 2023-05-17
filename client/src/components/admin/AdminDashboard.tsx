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
  // window.onload = function () {
  //   const isAdmin = sessionStorage.getItem("isAdmin");
  //   console.log(isAdmin);

  //   if (isAdmin !== "admin") {
  //     setTimeout(() => {
  //       window.location.href = `/`;
  //     }, 100);
  //   }
  // };
  // const [data, setData] = useState([]);
  return (
    <div className={styles.dashContainer}>
      {sessionStorage.getItem("isAdmin") !== "admin" ? (
        (window.location.href = "/")
      ) : Home ? (
        <Adminstat />
      ) : Admins ? (
        <Renderadmin />
      ) : Patients ? (
        <RenderPatients />
      ) : Doctors ? (
        <RenderDoctor />
      ) : Appointments ? (
        <RenderAppointments />
      ) : (
        <p>Oops...😥</p>
      )}
    </div>
  );
}
