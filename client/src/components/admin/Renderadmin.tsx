import { useState, useEffect } from "react";
import { Heading, useColorModeValue } from "@chakra-ui/react";

import styles from "./Renderadmin.module.css";
import adminIcon from "../../assets/Admin_icon.png";

function Renderadmin() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const baseURL = "https://jittery-shirt-tuna.cyclic.app";

  useEffect(() => {
    setLoading;
    fetch(`${baseURL}/user/all-admins`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setAdmins(data.admins);
        setError(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  });
  return (
    <div className={styles.dashContainer}>
      <Heading
        as={"h1"}
        fontWeight={600}
        fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
        lineHeight={"110%"}
        className={styles.heading}
      >
        Admins
      </Heading>
      {/* { this will be comming from the fectched data and return */}
      {
        <div className={styles.grid}>
          {loading ? (
            <h1>Loading...</h1>
          ) : error ? (
            <h1>Something went wrong...😟</h1>
          ) : (
            admins?.map((item) => {
              return (
                <div
                  className={styles.card}
                  style={{
                    backgroundColor: useColorModeValue("white", "grey"),
                  }}
                >
                  <div className={styles.cardDetails}>
                    <h2
                      style={{
                        color: useColorModeValue("green", "white"),
                      }}
                    >
                      Admin's Name : {item["name"]}
                    </h2>
                    <h2
                      style={{
                        color: useColorModeValue("green", "white"),
                      }}
                    >
                      Email : {item["email"]}
                    </h2>
                    <h2
                      style={{
                        color: useColorModeValue("green", "white"),
                      }}
                    >
                      Mobile : {item["mobile"]}
                    </h2>

                    {/* <Flex className={styles.btnSet} marginTop={'5px'} whiteSpace={'nowrap'}>
                            <button className={styles.buttonA}>Update</button>
                            <button className={styles.buttonB}>Delete</button>
                        </Flex> */}
                  </div>
                  <div className={styles.avt}>
                    <img src={adminIcon} alt="patient checkup" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      }
    </div>
  );
}

export default Renderadmin;
