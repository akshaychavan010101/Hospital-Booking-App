import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import image from "../../assets/poster2.jpg";
import { useState, useEffect } from "react";
import styles from "./ourDoctors.module.css";
import { Link } from "react-router-dom";
// import { json } from "react-router-dom";

export default function OurTeam() {
  const frontendUrl = "https://find-my-doctor.vercel.app";
  const [Cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // do this fetching in the parent component and pass the data as props to this component
  useEffect(() => {
    setIsLoading(true);
    fetch("https://jittery-shirt-tuna.cyclic.app/doctors/all-doctors")
      .then((res) => res.json())
      .then((data) => {
        setCards(data.doctors);
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <img className={styles.banner1} src={image} alt="" />
      <Flex
        flexWrap={"wrap"}
        gap={"30px"}
        justifyContent={"center"}
        mt={"6rem"}
        mb={"4rem"}
      >
        {isLoading ? <h1 style={{ fontSize: "2rem" }}>Loading...</h1> : null}
        {Cards?.map((items) => {
          return (
            <Stack key={items["id"]}
              borderWidth="1px"
              borderRadius="lg"
              w={{ sm: "100%", md: "540px" }}
              height={{ sm: "476px", md: "20rem" }}
              direction={{ base: "column", md: "row" }}
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              padding={4}
            >
              <Flex flex={1} bg="blue.200" onClick={() => {
                window.location.href = `${frontendUrl}/doctordetails`
              }}>
                <Image objectFit="fill" boxSize="100%" src={items["avatar"]} onClick={() => {
                      sessionStorage.setItem(
                        "Doctor",
                        (items["id"])
                      );
                    }} />
              </Flex>
              <Stack
                flex={1}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                p={1}
                pt={2}
              >
                <Heading fontSize={"2xl"} fontFamily={"body"}>
                  {items["name"]}
                </Heading>
                <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                  {items["department"]}
                </Text>
                <Text
                  textAlign={"center"}
                  color={useColorModeValue("gray.700", "gray.400")}
                  px={3}
                >
                  Speciality :- {items["speciality"]}
                  {/* <Link href={"#"} color={"blue.400"}>
                  #tag
                </Link>
                me in your posts */}
                </Text>

                <Text
                  textAlign={"center"}
                  color={useColorModeValue("gray.700", "gray.400")}
                  px={3}
                >
                  Rating :- {items["rating"]["length"]}
                  {/* <Link href={"#"} color={"blue.400"}>
                  #tag
                </Link>
                me in your posts */}
                </Text>
                {/* <Stack
                align={"center"}
                justify={"center"}
                direction={"row"}
                mt={6}
              >
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue("gray.50", "gray.800")}
                  fontWeight={"400"}
                >
                  #art
                </Badge>
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue("gray.50", "gray.800")}
                  fontWeight={"400"}
                >
                  #photography
                </Badge>
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue("gray.50", "gray.800")}
                  fontWeight={"400"}
                >
                  #music
                </Badge>
              </Stack> */}

                <Stack
                  width={"100%"}
                  mt={"2rem"}
                  direction={"row"}
                  padding={2}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Button
                    flex={2}
                    fontSize={"sm"}
                    rounded={"full"}
                    _focus={{
                      bg: "gray.200",
                    }}
                    
                  >
                    <Link to="/appointment">Book Appointment</Link>
                  </Button>
                  <Button
                    flex={1}
                    fontSize={"sm"}
                    rounded={"full"}
                    bg={"blue.400"}
                    color={"white"}
                    boxShadow={
                      "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                    }
                    _hover={{
                      bg: "blue.500",
                    }}
                    _focus={{
                      bg: "blue.500",
                    }}
                    onClick={() => {
                      sessionStorage.setItem(
                        "Doctor",
                        (items["id"])
                      );
                    }}
                  >
                    <Link to={"/doctordetails"}>Follow</Link>
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          );
        })}
      </Flex>
    </div>
  );
}
