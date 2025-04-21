import { useState, useEffect } from "react";
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";

import styles from "./RenderPatients.module.css";
import Swal from "sweetalert2";
import patient from "../../assets/patientLogo.png";

function RenderPatients() {
  // const [updateModel, setUpdateModel] = useState("none")
  // const [oldData, setOlddata] = useState(Object)
  const [add, setAdd] = useState(false);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const baseURL = "https://jittery-shirt-tuna.cyclic.app";
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    setLoading;
    fetch(`${baseURL}/user/all-users`, {
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
        setPatients(data.users);
        setError(false);
      })
      .catch((err) => {
        Swal.fire(err);
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
          Patients
        </Heading>
      </Flex>

      {/* { this will be comming from the fectched data and return */}
      {
        <div className={styles.grid}>
          {loading ? (
            <h1>Loading...</h1>
          ) : error || patients == undefined || patients.length == 0 ? (
            <h1>Something went wrong...😟</h1>
          ) : (
            patients?.map((item) => {
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
                      Patient's Name : {item["name"]}
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
                      Mob. No. : {item["mobile"]}
                    </h2>
                    {/* <h2 style={{
                                    color: useColorModeValue('green', "white"),
                                }}>Disease : {item["disease"]}</h2> */}

                    <Flex
                      className={styles.btnSet}
                      marginTop={"5px"}
                      whiteSpace={"nowrap"}
                    >
                      <button
                        className={styles.buttonB}
                        onClick={() => {
                          fetch(`${baseURL}/user/delete-user/${item["id"]}`, {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                              authorization: `${sessionStorage.getItem(
                                "token"
                              )}`,
                            },
                          })
                            .then((res) => {
                              return res.json();
                            })
                            .then((data) => {
                              Swal.fire(data.msg);
                              if (data.msg == "User deleted") {
                                setAdd(true);
                              }
                            })
                            .catch((err) => {
                              Swal.fire(err);
                            });
                        }}
                      >
                        Remove
                      </button>
                    </Flex>
                  </div>
                  <div className={styles.avt}>
                    <img src={patient} alt="patient image" />
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

export default RenderPatients;
