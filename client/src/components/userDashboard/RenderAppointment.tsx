import { useState, useEffect } from "react";
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";

import styles from "../admin/RenderAppointments.module.css";
import Swal from "sweetalert2";
import apptImage from "../../assets/prognosis-icon-2803190_960_720.png";

function RenderAppointments() {
  const [add, setAdd] = useState(false);
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // const baseURL = "https://jittery-shirt-tuna.cyclic.app";
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    setLoading;
    fetch(`${baseURL}/appointments/user-all-appointments`, {
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
        setAdd(false);
        setLoading(false);
        setAppointment(data.appointments);
        setError(false);
      })
      .catch((err) => {
        Swal.fire(err.msg);
        setAdd(false);
        setLoading(false);
        setError(true);
      });
  }, [add]);
  return (
    <div className={styles.dashContainer}>
      <Flex justifyContent={"space-around"} alignContent={"center"}>
        <Heading
          as={"h1"}
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          lineHeight={"110%"}
          className={styles.heading}
        >
          Appointments
        </Heading>
      </Flex>

      {/* { this will be comming from the fectched data and return */}
      {
        <div className={styles.grid}>
          {loading ? (
            <h1>Loading...</h1>
          ) : error || appointment == undefined ? (
            <h1>Oopps... Something went wrong 😟</h1>
          ) : appointment.length == 0 ? (
            <h1>You Have No Appointments 🤗</h1>
          ) : (
            appointment?.map((item) => {
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
                      Patient's Name : {item["patientName"]}
                    </h2>
                    <h2
                      style={{
                        color: useColorModeValue("green", "white"),
                      }}
                    >
                      Doctor's Name : {item["doctorName"]}
                    </h2>
                    <h2
                      style={{
                        color: useColorModeValue("green", "white"),
                      }}
                    >
                      Date : {item["date"]}
                    </h2>
                    <h2
                      style={{
                        color: useColorModeValue("green", "white"),
                      }}
                    >
                      Time : {item["time"]}
                    </h2>
                    <h2
                      style={{
                        color: useColorModeValue("green", "white"),
                      }}
                    >
                      Status : {item["status"]}
                    </h2>

                    <Flex
                      className={styles.btnSet}
                      marginTop={"5px"}
                      whiteSpace={"nowrap"}
                    >
                      <button
                        className={styles.buttonB}
                        onClick={() => {
                          fetch(
                            `${baseURL}/appointments/cancel-appointment/${item["id"]}`,
                            {
                              method: "PATCH",
                              headers: {
                                "Content-Type": "application/json",
                                authorization: `${sessionStorage.getItem(
                                  "token"
                                )}`,
                              },
                            }
                          )
                            .then((res) => {
                              return res.json();
                            })
                            .then((data) => {
                              Swal.fire(data.msg);
                              if (data.msg == "Appointment cancelled") {
                                setAdd(true);
                                //    document.getElementById(item["id"]).innerText = "Approved"
                              }
                            })
                            .catch((err) => {
                              Swal.fire(err);
                            });
                        }}
                      >
                        Cancel
                      </button>
                    </Flex>
                  </div>
                  <div className={styles.avt}>
                    <img src={apptImage} alt="patient checkup" />
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

export default RenderAppointments;
