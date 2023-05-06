import styles from "./Appointment.module.css"
import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Stack, Textarea } from "@chakra-ui/react";
import { motion } from "framer-motion";

type FormValues = {
    day: string;
    date: Date;
    doctor: string;
    phone: string;
    message: string;
};

const initialFormValues: FormValues = {
    day: "",
    date: new Date,
    doctor: "",
    phone: "",
    message: "",
};

const Appointment = () => {
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form submitted:", formValues);
    };

    return (
        <Box as="form" onSubmit={handleSubmit} p={6} bg="white" borderRadius="md" shadow="md" marginTop={"10vh"} textAlign={"center"}>
            <Heading as="h2" size="lg" mb={6}>
                Health Care Appointment
            </Heading>
            <Stack spacing={4} width={{ base: '1xl', sm: '2xl', md: 'xl' }} margin={"auto"} className={styles.formContainer}>
                <FormControl id="day" isRequired>
                    <FormLabel fontWeight="bold">Appointment Day</FormLabel>
                    {/* value={formValues.name} onChange={handleInputChange} */}
                    <Select placeholder="Select Day" bg="gray.50" border="none" borderRadius="md">
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option disabled value="0">Sunday (leave)</option>
                    </Select>
                </FormControl>
                <FormControl id="date" isRequired>
                    <FormLabel fontWeight="bold">Appointment Date</FormLabel>
                    <Input type="date" name="Appointment Date" onChange={handleInputChange} bg="gray.50" border="none" borderRadius="md" />
                </FormControl>
                <FormControl id="doctor" isRequired>
                    <FormLabel fontWeight="bold">Doctor's Name</FormLabel>
                    <Select placeholder="Select Doctor" bg="gray.50" border="none" borderRadius="md">
                        <option value="Dr. Akshay">Dr. Akshay</option>
                        <option value="Dr. Raj">Dr. Raj</option>
                        <option value="Dr. Saurav">Dr. Saurav</option>
                        <option value="Dr. Gaurav">Dr. Gaurav</option>
                        <option value="dr. Vishal">dr. Vishal</option>
                    </Select>
                </FormControl>
                <FormControl id="phone" isRequired>
                    <FormLabel fontWeight="bold">Phone</FormLabel>
                    <Input type="tel" name="phone" value={formValues.phone} onChange={handleInputChange} bg="gray.50" border="none" borderRadius="md" />
                </FormControl>
                <FormControl id="ambulance" isRequired>
                    <FormLabel fontWeight="bold">Need Ambulance?</FormLabel>
                    <Select placeholder="Need Ambulance?" bg="gray.50" border="none" borderRadius="md">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </Select>
                </FormControl>
                <FormControl id="message">
                    <FormLabel fontWeight="bold">Message</FormLabel>
                    <Textarea name="message" value={formValues.message} onChange={handleInputChange} bg="gray.50" border="none" borderRadius="md" />
                </FormControl>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button type="submit" colorScheme="teal" bg="teal.500" borderRadius="md" _hover={{ bg: "teal.600" }}>
                        Book Now
                    </Button>
                </motion.div>
            </Stack>
        </Box>
    );
};

export default Appointment;
