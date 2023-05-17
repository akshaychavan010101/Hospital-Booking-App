import styles from "./UserDashboard.module.css";

import RenderAppointments from "./RenderAppointment";
import RenderUserProfile from "./UserProfile";

interface Myprops {
  profile: boolean;
  appointments: boolean;
}

export default function UserDashboard(props: Myprops) {
  const { profile, appointments } = props;
  return (
    <div className={styles.dashContainer}>
      {appointments ? (
        <RenderAppointments />
      ) : profile ? (
        <RenderUserProfile />
      ) : (
        <h1>Oops..something went wrong☹️</h1>
      )}
    </div>
  );
}
