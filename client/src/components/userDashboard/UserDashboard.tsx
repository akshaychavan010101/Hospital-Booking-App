import styles from "./UserDashboard.module.css";
import patientImg from "../../assets/patient.png";

import {
    Flex,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react';

export default function UserDashboard() {
    return (
        <div className={styles.dashContainer}>
            <Heading color={useColorModeValue('#3375FF', "#FF33FF")}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'} >Your Appointments</Heading>
            {/* this will be comming from the fectched data and return */}
            <div className={styles.grid}>
                <div className={styles.card} 
                style={{
                    backgroundColor: useColorModeValue('white', "grey"),
                }}
                >
                    <div className={styles.cardDetails}>
                        <h2
                            style={{
                                color: useColorModeValue('green', "white"),
                            }}
                        >Patient's Name : {"ujdfdsfb"}</h2>
                        <h2 style={{
                            color: useColorModeValue('green', "white"),
                        }}>Doctor's Name : {"jhdfdsf"}</h2>
                        <h2 style={{
                            color: useColorModeValue('green', "white"),
                        }}>Disease / checkup : {"jsdfdsfb"}</h2>
                        <h2 style={{
                            color: useColorModeValue('green', "white"),
                        }}>Appointment Time and Date : {"jdsnfdsfb"}</h2>

                        <Flex className={styles.btnSet} marginTop={'5px'} whiteSpace={'nowrap'}>
                            <button className={styles.button}>Cancel</button>
                            <button className={styles.button}>Delete</button>
                            <button className={styles.button}>Status : {"Completed"}</button>
                        </Flex>
                    </div>
                    <div className={styles.avt}>
                        <img src={patientImg} alt="patient checkup" />
                    </div>
                </div>
                <div className={styles.card} 
                style={{
                    backgroundColor: useColorModeValue('white', "grey"),
                }}
                >
                    <div className={styles.cardDetails}>
                        <h2
                            style={{
                                color: useColorModeValue('green', "white"),
                            }}
                        >Patient's Name : {"ujdfdsfb"}</h2>
                        <h2 style={{
                            color: useColorModeValue('green', "white"),
                        }}>Doctor's Name : {"jhdfdsf"}</h2>
                        <h2 style={{
                            color: useColorModeValue('green', "white"),
                        }}>Disease / checkup : {"jsdfdsfb"}</h2>
                        <h2 style={{
                            color: useColorModeValue('green', "white"),
                        }}>Appointment Time and Date : {"jdsnfdsfb"}</h2>

                        <Flex className={styles.btnSet} marginTop={'5px'} whiteSpace={'nowrap'}>
                            <button className={styles.button}>Cancel</button>
                            <button className={styles.button}>Delete</button>
                            <button className={styles.button}>Status : {"Completed"}</button>
                        </Flex>
                    </div>
                    <div className={styles.avt}>
                        <img src={patientImg} alt="patient checkup" />
                    </div>
                </div>
                <div className={styles.card} 
                style={{
                    backgroundColor: useColorModeValue('white', "grey"),
                }}
                >
                    <div className={styles.cardDetails}>
                        <h2
                            style={{
                                color: useColorModeValue('green', "white"),
                            }}
                        >Patient's Name : {"ujdfdsfb"}</h2>
                        <h2 style={{
                            color: useColorModeValue('green', "white"),
                        }}>Doctor's Name : {"jhdfdsf"}</h2>
                        <h2 style={{
                            color: useColorModeValue('green', "white"),
                        }}>Disease / checkup : {"jsdfdsfb"}</h2>
                        <h2 style={{
                            color: useColorModeValue('green', "white"),
                        }}>Appointment Time and Date : {"jdsnfdsfb"}</h2>

                        <Flex className={styles.btnSet} marginTop={'5px'} whiteSpace={'nowrap'}>
                            <button className={styles.button}>Cancel</button>
                            <button className={styles.button}>Delete</button>
                            <button className={styles.button}>Status : {"Completed"}</button>
                        </Flex>
                    </div>
                    <div className={styles.avt}>
                        <img src={patientImg} alt="patient checkup" />
                    </div>
                </div>
                <div className={styles.card} 
                style={{
                    backgroundColor: useColorModeValue('white', "grey"),
                }}
                >
                    <div className={styles.cardDetails}>
                        <h2
                            style={{
                                color: useColorModeValue('green', "white"),
                            }}
                        >Patient's Name : {"ujdfdsfb"}</h2>
                        <h2 style={{
                            color: useColorModeValue('green', "white"),
                        }}>Doctor's Name : {"jhdfdsf"}</h2>
                        <h2 style={{
                            color: useColorModeValue('green', "white"),
                        }}>Disease / checkup : {"jsdfdsfb"}</h2>
                        <h2 style={{
                            color: useColorModeValue('green', "white"),
                        }}>Appointment Time and Date : {"jdsnfdsfb"}</h2>

                        <Flex className={styles.btnSet} marginTop={'5px'} whiteSpace={'nowrap'}>
                            <button className={styles.button}>Cancel</button>
                            <button className={styles.button}>Delete</button>
                            <button className={styles.button}>Status : {"Completed"}</button>
                        </Flex>
                    </div>
                    <div className={styles.avt}>
                        <img src={patientImg} alt="patient checkup" />
                    </div>
                </div>
                <div className={styles.card} 
                style={{
                    backgroundColor: useColorModeValue('white', "grey"),
                }}
                >
                    <div className={styles.cardDetails}>
                        <h2
                            style={{
                                color: useColorModeValue('green', "white"),
                            }}
                        >Patient's Name : {"ujdfdsfb"}</h2>
                        <h2 style={{
                            color: useColorModeValue('green', "white"),
                        }}>Doctor's Name : {"jhdfdsf"}</h2>
                        <h2 style={{
                            color: useColorModeValue('green', "white"),
                        }}>Disease / checkup : {"jsdfdsfb"}</h2>
                        <h2 style={{
                            color: useColorModeValue('green', "white"),
                        }}>Appointment Time and Date : {"jdsnfdsfb"}</h2>

                        <Flex className={styles.btnSet} marginTop={'5px'} whiteSpace={'nowrap'}>
                            <button className={styles.button}>Cancel</button>
                            <button className={styles.button}>Delete</button>
                            <button className={styles.button}>Status : {"Completed"}</button>
                        </Flex>
                    </div>
                    <div className={styles.avt}>
                        <img src={patientImg} alt="patient checkup" />
                    </div>
                </div>
              
            </div>
        </div>
    );
}