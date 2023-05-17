import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from "@chakra-ui/react";
//   import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function DoctorDetails() {
  // const [detail, setDetail] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [depart, setDepart] = useState("");
  const [rating, setRating] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [aval, setAval] = useState("");
  const [fees, setFees] = useState("");
  const [desc, setdesc] = useState(Object);
  const [loading, setLoading] = useState(false);

  const baseURL = "https://jittery-shirt-tuna.cyclic.app";

  useEffect(() => {
    setLoading(true);
    fetch(
      `${baseURL}/doctors/single-doctor/${sessionStorage.getItem("Doctor")}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAvatar(data.doctor.avatar);
        setName(data.doctor.name);
        setDepart(data.doctor.department);
        setAval(data.doctor.availability);
        setSpeciality(data.doctor.speciality);
        setRating(data.doctor.rating);
        setFees(data.doctor.fee);
        setdesc(data.doctor.descdoctor);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire(err.msg);
      });
  }, []);

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            width="100"
            alt={name}
            src={avatar}
            fit={"cover"}
            align={"center"}
            // w={'100%'}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
          {loading ? <Heading>Loading...</Heading> : ""}
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {name}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {depart} <br />
              {speciality}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {desc["education"]}
              </Text>
              <Text fontSize={"lg"}>
                Certifications : {desc["Certifications"]}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Honors & Awards
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Professional</ListItem>
                  <ListItem>Publications</ListItem>{" "}
                  <ListItem>Expertise</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>{desc["Professional"]}</ListItem>
                  <ListItem>{desc["Publications"]}</ListItem>
                  <ListItem>{desc["Expertise"]}</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Fees and Ratings
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Rating :
                  </Text>{" "}
                  {rating.length}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Fees :
                  </Text>{" "}
                  {fees} Rs.
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Availability :
                  </Text>{" "}
                  {aval} Slots
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            <Link to="/appointment">Book Appointment</Link>
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>Ambulance service available</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
