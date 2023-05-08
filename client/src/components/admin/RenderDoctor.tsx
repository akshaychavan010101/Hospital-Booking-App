import { useState, useEffect } from "react";
import {
    Flex,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react';

import styles from "./RenderDoctor.module.css"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";



function RenderDoctor() {
    const [modelDisplay, setModelDisplay] = useState("none");
    const [updateModel, setUpdateModel] = useState("none")
    const [oldData, setOlddata] = useState(Object)
    const [add, setAdd] = useState(false);
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const baseURL = "https://jittery-shirt-tuna.cyclic.app"
    useEffect(() => {
        setLoading
        fetch(`${baseURL}/doctors/all-doctors`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'authorization' : `${sessionStorage.getItem('token')}`
            }
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data);
                
                setAdd(false)
                setLoading(false)
                setDoctors(data.doctors)
                setError(false)
            })
            .catch((err) => {
                setAdd(false)
                console.log(err)
                setLoading(false);
                setError(true);
            })

    }, [add])
    return (
        <div className={styles.dashContainer}>
            <Flex justifyContent={"space-around"} alignContent={"center"}>
                <Heading as={'h1'}
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                    lineHeight={'110%'} className={styles.heading} >Doctors</Heading>
                <button className={styles.Addbtn} onClick={() => {
                    setModelDisplay("block")
                }}>Add Doctor</button>
            </Flex>
            {/* form for add */}
            <div className={styles.addform} style={{ display: modelDisplay }}>
                <button onClick={() => {
                    setModelDisplay("none");
                }}>❌</button>
                <form id="formdata" onSubmit={(event) => {
                    event.preventDefault();
                    const form = document.getElementById("formdata") as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);
                    console.log(data);
                    const payload = {
                        ...data,
                        education: "Bachelor of Medicine and Bachelor of Surgery (MBBS), Harvard University, Los Angeles (UCLA). Residency in Internal Medicine, Cedars-Sinai Medical Center, Los Angeles. Fellowship in Cardiology, Stanford University Medical Center",
                        Professional: "Assistant Professor of Cardiology, Stanford University School of Medicine (current position). Cardiologist, Stanford Health Care (current position)",
                        Certifications: "American Board of Internal Medicine - Cardiovascular Disease. National Board of Echocardiography",
                        Expertise: "General cardiology. Advanced heart failure. Cardiac imaging. Heart transplantation. Cardiovascular disease prevention",
                        Honors_and_Awards: "Cedars-Sinai Medical Center, Los Angeles. Fellowship in Cardiology, Stanford University Medical Center",
                        Publications: "Author or co-author of over 50 peer-reviewed articles and book chapters in cardiology",
                        Professional_Memberships: "Assistant Professor of Cardiology, Stanford University School of Medicine (current position). Cardiologist,",
                        mobile: "424424265",
                        availability: 5

                    }
                    console.log(payload);
                    setLoading(true);

                    fetch(`${baseURL}/doctors/add-doctor`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            'authorization' : `${sessionStorage.getItem('token')}`
                        },
                        body: JSON.stringify(payload)
                    })
                        .then((res) => {
                            return res.json()
                        })
                        .then((data) => {
                            setLoading(false);
                            setError(false);
                            Swal.fire(data.msg);
                            if (data.msg == "Doctor added successfully") {
                                setAdd(true);
                            }

                        })
                        .catch((err) => {
                            Swal.fire(err)
                            setLoading(false);
                            setError(true);
                            setAdd(false)

                        })
                        .finally(() => {
                            setModelDisplay("none")
                            setLoading(false)
                        })
                }}>
                    <Flex justifyContent={"space-around"} alignItems={"center"}>
                        <label className={styles.lable}>Name : </label>
                        <input className={styles.input} name="name" type="text" placeholder="Enter name" required /> <br />
                    </Flex >
                    <Flex justifyContent={"space-around"} alignItems={"center"}>
                        <label className={styles.lable}>Image : </label>
                        <input className={styles.input} name="avatar" type="text" placeholder="Enter image link" required /><br />
                    </Flex >
                    <Flex justifyContent={"space-around"} alignItems={"center"}>
                        <label className={styles.lable}>Speciality : </label>
                        <input className={styles.input} name="speciality" type="text" placeholder="Enter Speciality" required /><br />
                    </Flex >
                    <Flex justifyContent={"space-around"} alignItems={"center"}>
                        <label className={styles.lable}>Department : </label>
                        <input className={styles.input} name="department" type="text" placeholder="Enter Department" required /><br />
                    </Flex >
                    <Flex justifyContent={"space-around"} alignItems={"center"}>
                        <label className={styles.lable}>Rating : </label>
                        <input className={styles.input} name="rating" type="number" placeholder="Enter Rating" required /><br />
                    </Flex >
                    <Flex justifyContent={"space-around"} alignItems={"center"}>
                        <label className={styles.lable}>Fees : </label>
                        <input className={styles.input} name="fee" type="number" placeholder="Enter Fees" required /><br />
                    </Flex >
                    <Flex justifyContent={"center"} alignItems={"center"}>
                        <input className={styles.submitbtn} type="submit" />
                    </Flex >


                </form>
            </div>
            {/* form for update */}
            <div className={styles.updateform} style={{ display: updateModel }}>
                <button onClick={() => {
                    setUpdateModel("none");
                }}>❌</button>
                <form id="formdata2" onSubmit={(event) => {
                    event.preventDefault();
                    const form = document.getElementById("formdata2") as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);
                    console.log(data);
                    const payload = {
                        ...data,
                    }
                    console.log(payload);
                    setLoading(true);

                    fetch(`${baseURL}/doctors/update-doctor/${oldData["id"]}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            'authorization' : `${sessionStorage.getItem('token')}`
                        },
                        body: JSON.stringify(payload)
                    })
                        .then((res) => {
                            return res.json()
                        })
                        .then((data) => {
                            setLoading(false);
                            setError(false);
                            Swal.fire(data.msg);
                            if (data.msg == "Doctor updated successfully") {
                                setAdd(true);
                            }
                        })
                        .catch((err) => {
                            Swal.fire(err)
                            setLoading(false);
                            setError(true);
                            setAdd(false);
                        })
                        .finally(() => {
                            setUpdateModel("none")
                            setLoading(false)
                        })
                }}>
                    <Flex justifyContent={"space-around"} alignItems={"center"}>
                        <label className={styles.lable}>Name : </label>
                        <input onChange={(e) => {
                            setOlddata( {...oldData,name:e.target.value})
                        }} value={oldData["name"]} className={styles.input} name="name" type="text" placeholder="Enter name" required /> <br />
                    </Flex >
                    <Flex justifyContent={"space-around"} alignItems={"center"}>
                        <label className={styles.lable}>Image : </label>
                        <input onChange={(e) => {
                            setOlddata( {...oldData,avatar:e.target.value})
                        }} value={oldData["avatar"]} className={styles.input} name="avatar" type="text" placeholder="Enter image link" required /><br />
                    </Flex >
                    <Flex justifyContent={"space-around"} alignItems={"center"}>
                        <label className={styles.lable}>Speciality : </label>
                        <input onChange={(e) => {
                            setOlddata( {...oldData,speciality:e.target.value})
                        }} value={oldData["speciality"]} className={styles.input} name="speciality" type="text" placeholder="Enter Speciality" required /><br />
                    </Flex >
                    <Flex justifyContent={"space-around"} alignItems={"center"}>
                        <label className={styles.lable}>Department : </label>
                        <input onChange={(e) => {

                            setOlddata( {...oldData,department:e.target.value})
                        }} value={oldData["department"]} className={styles.input} name="department" type="text" placeholder="Enter Department" required /><br />
                    </Flex >
                    <Flex justifyContent={"space-around"} alignItems={"center"}>
                        <label className={styles.lable}>Rating : </label>
                        <input onChange={(e) => {
                            setOlddata( {...oldData,rating:e.target.value})
                        }} value={oldData["rating"]} className={styles.input} name="rating" type="number" placeholder="Enter Rating" required /><br />
                    </Flex >
                    <Flex justifyContent={"space-around"} alignItems={"center"}>
                        <label className={styles.lable}>Fees : </label>
                        <input onChange={(e) => {
                            setOlddata( {...oldData,fee:e.target.value})
                        }} value={oldData["fee"]} className={styles.input} name="fee" type="number" placeholder="Enter Fees" required /><br />
                    </Flex >
                    <Flex justifyContent={"center"} alignItems={"center"}>
                        <input className={styles.submitbtn} type="submit" />
                    </Flex >


                </form>
            </div>
            {/* { this will be comming from the fectched data and return */}
            {<div className={styles.grid}>
                {loading ? <h1>Loading...</h1> : error || doctors == undefined || doctors.length == 0 ? <h1>Something went wrong...😟</h1> : doctors?.map((item) => {
                    return (
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
                                >Doctor's Name : {item["name"]}</h2>
                                <h2 style={{
                                    color: useColorModeValue('green', "white"),
                                }}>Speciality : {item["speciality"]}</h2>
                                <h2 style={{
                                    color: useColorModeValue('green', "white"),
                                }}>Department : {item["department"]}</h2>
                                <h2 style={{
                                    color: useColorModeValue('green', "white"),
                                }}>Availability : {item["availability"]}</h2>

                                <Flex className={styles.btnSet} marginTop={'5px'} whiteSpace={'nowrap'}>
                                    <button className={styles.buttonA} onClick={() => {
                                        setUpdateModel("block")
                                        const data = doctors.filter((el) => {
                                            return el["id"] == item["id"];
                                        })
                                        setOlddata(data[0]);

                                    }}>Update</button>
                                    <button className={styles.buttonB} onClick={() => {
                                        fetch(`${baseURL}/doctors/delete-doctor/${item["id"]}`, {
                                            method: "DELETE",
                                            headers: {
                                                "Content-Type": "application/json",
                                                "authorization": `${sessionStorage.getItem("token")}`
                                            }
                                        })
                                            .then(res => { return res.json() })
                                            .then(data => {
                                                Swal.fire(data.msg);
                                                if (data.msg == "Doctor deleted successfully") {
                                                    setAdd(true);
                                                }
                                            })
                                            .catch(err => {
                                                Swal.fire(err);
                                            })


                                    }}>Remove</button>
                                    <Link to={"/doctordetails"}><button className={styles.buttonB} onClick={() => {
                                        sessionStorage.setItem(
                                            "Doctor",
                                            (item["id"])
                                        );
                                    }}>Details</button></Link>

                                </Flex>
                            </div>
                            <div className={styles.avt} >
                                <img src={item["avatar"]} alt="patient checkup" />
                            </div>
                        </div>
                    )
                })}

            </div>}
        </div>
    )
}

export default RenderDoctor