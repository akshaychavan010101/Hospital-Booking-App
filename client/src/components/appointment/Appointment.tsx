import styles from "./Appointment.module.css";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Appointment = () => {
  // const baseURL = "https://jittery-shirt-tuna.cyclic.app";
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [fetchData, setFetchData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${baseURL}/doctors/all-doctors`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFetchData(data.doctors);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const bookSlot = () => {
    const date = document.getElementById("date") as HTMLInputElement;
    const doctor = document.getElementById("doctor") as HTMLInputElement;
    const time = document.getElementById("Time") as HTMLInputElement;

    if (
      sessionStorage.getItem("login") == null ||
      sessionStorage.getItem("token") == null
    ) {
      Swal.fire("Login to book appointment");
      return;
    }

    if (date.value == "" || doctor.value == "" || time.value == "") {
      Swal.fire("Please fill all the fields");
      return;
    }

    let dname = "";
    for (let i = 0; i < fetchData.length; i++) {
      if (fetchData[i]["id"] == doctor.value) {
        dname = fetchData[i]["name"];
        break;
      }
    }
    const payload = {
      date: date.value,
      doctorName: dname,
      time: time.value,
      doctorId: doctor.value,
    };

    let token = sessionStorage.getItem("token") || "";

    setLoading(true);
    fetch(`${baseURL}/appointments/book-appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.msg == "Appointment booked successfully") {
          Swal.fire("Appointment booked successfully").then(() => {
            setLoading(false);
            setTimeout(() => {
              window.location.href = `/user/dashboard`;
            }, 500);
          });
        } else {
          setLoading(false);
          Swal.fire(data.msg);
        }
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire(err.msg);
      });
  };

  return (
    <Box
      as="form"
      p={6}
      bg={useColorModeValue("white.50", "gray.800")}
      borderRadius="md"
      shadow="md"
      marginTop={"10vh"}
      textAlign={"center"}
    >
      <Heading as="h2" size="lg" mb={6}>
        Health Care Appointment
      </Heading>
      <Stack
        spacing={4}
        width={{ base: "1xl", sm: "2xl", md: "xl" }}
        margin={"auto"}
        className={styles.formContainer}
      >
        <FormControl id="date" isRequired>
          <FormLabel fontWeight="bold">Appointment Date</FormLabel>
          <Input
            type="date"
            name="Appointment Date"
            bg={useColorModeValue("gray.50", "gray.800")}
            border="1px solid silver"
            borderRadius="md"
          />
        </FormControl>

        <FormControl id="doctor" isRequired>
          <FormLabel fontWeight="bold">Doctor's Name</FormLabel>
          <Select
            placeholder="Select Doctor"
            bg={useColorModeValue("gray.50", "gray.800")}
            border="1px solid silver"
            borderRadius="md"
            id="doctor"
          >
            {fetchData?.map((el, i) => {
              return (
                <option key={i} value={el["id"]}>
                  {el["name"]}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl id="Time" isRequired>
          <FormLabel fontWeight="bold">Time</FormLabel>
          <Select
            placeholder="Select Day"
            bg={useColorModeValue("white.50", "gray.800")}
            border="1px solid silver"
            borderRadius="md"
          >
            <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
            <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
            <option value="01:00 PM - 02:00 PM">01:00 PM - 02:00 PM</option>
            <option value="02:30 PM - 03:30 PM">02:30 PM - 03:30 PM</option>
            <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
          </Select>
        </FormControl>
        <FormControl id="phone" isRequired>
          <FormLabel fontWeight="bold">Phone</FormLabel>
          <Input
            type="tel"
            name="phone"
            bg={useColorModeValue("white.50", "gray.800")}
            border="1px solid silver"
            borderRadius="md"
          />
        </FormControl>
        <FormControl id="ambulance" isRequired>
          <FormLabel fontWeight="bold">Need Ambulance?</FormLabel>
          <Select
            placeholder="Need Ambulance?"
            bg={useColorModeValue("gray.10", "gray.800")}
            border="1px solid silver"
            borderRadius="md"
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </Select>
        </FormControl>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            type="submit"
            colorScheme="teal"
            bg="teal.500"
            borderRadius="md"
            _hover={{ bg: "teal.600" }}
            onClick={(event) => {
              event.preventDefault();
              bookSlot();
            }}
          >
            {sessionStorage.getItem("login")
              ? "Book Appointment"
              : "Login to Book Appointment"}
          </Button>
          {loading ? "Loading..." : ""}
        </motion.div>
      </Stack>
    </Box>
  );
};

export default Appointment;
