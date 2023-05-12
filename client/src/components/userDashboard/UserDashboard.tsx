import RenderAppointments from "../admin/RenderAppointments";
import styles from "./UserDashboard.module.css";

import RenderUserProfile from "./UserProfile";

interface Myprops {
    profile: boolean;
    appointments: boolean;
}


export default function UserDashboard(props: Myprops) {

    const { profile, appointments } = props;

    // useEffect(() => {


    // }, [])


    return (
        <div className={styles.dashContainer}>
            {profile ? <RenderUserProfile /> : appointments ? <RenderAppointments /> : <h1>Oops....😥</h1>}
        </div>
    );
}


