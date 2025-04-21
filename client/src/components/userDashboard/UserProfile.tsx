import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import patientLogo from "../../assets/patientLogo.png";
import { useEffect, useState } from "react";

export default function RenderUserProfile() {
  // const baseURL = "https://jittery-shirt-tuna.cyclic.app";
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    fetch(`${baseURL}/user/userDetails`, {
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
        console.log(data);
        setUser(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Flex
      height={"100vh"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <i>This page is under construction</i>
      <Heading>My Profile</Heading>

      <Center py={6}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "540px" }}
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          <Flex flex={1} bg="blue.200">
            <Image
              objectFit="cover"
              boxSize="100%"
              src={patientLogo}
              alt="Profile Picture"
            />
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
              {user ? user.name : "Login to view your profile"}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              {user?.email}
            </Text>
            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
            >
              {user?.mobile}
            </Text>
            <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
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
            </Stack>

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                _focus={{
                  bg: "gray.200",
                }}
                display={user?.name ? "block" : "none"}
              >
                Edit
              </Button>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"red.500"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "red.600",
                }}
                _focus={{
                  bg: "red.600",
                }}
                display={user?.name ? "block" : "none"}
              >
                Delete Acc
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Center>
    </Flex>
  );
}
