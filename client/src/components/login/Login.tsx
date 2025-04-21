import styles from "./login.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineGithub } from "react-icons/ai";
import Swal from "sweetalert2";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Center,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Login() {
  // const baseURL = "https://jittery-shirt-tuna.cyclic.app";
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  if (login) {
    sessionStorage.setItem("login", "true");
  }

  async function handleSignIn() {
    const email: string = (document.getElementById("email") as HTMLInputElement)
      .value;
    const password: string = (
      document.getElementById("password") as HTMLInputElement
    ).value;

    if (email == "" || password == "") {
      Swal.fire("Please Fill All Details");

      return;
    }

    try {
      const payload = { email, password };

      setLoading(true);
      let fData = await fetch(`${baseURL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(payload),
      });

      const data = await fData.json();
      if (data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("userName", data.userName);
        setLogin(true);
        setLoading(false);
        Swal.fire(data.msg);

        console.log(data);

        if (data.msg == "Login Successful") {
          if (data.isAdmin == "admin") {
            sessionStorage.setItem("isAdmin", "admin");
            Swal.fire(data.msg).then(() => {
              setTimeout(() => {
                window.location.href = `/admin/dashboard`;
              }, 1000);
            });
          } else {
            Swal.fire(data.msg).then(() => {
              setTimeout(() => {
                window.location.href = `/`;
              }, 1000);
            });
          }
        }
      } else {
        setLogin(false);
        Swal.fire("Email is not registered/Wrong Credentials").then(() => {
          setLoading(false);
        });
      }
    } catch (error) {
      Swal.fire("Something went wrong").then(() => {
        setLoading(false);
      });
    }
  }

  function GitHubLogin() {
    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=d538c648012f0c82fe00";
  }

  async function GoogleLogin() {
    window.location.href = `${baseURL}/user/auth/google`;
  }

  return (
    <Flex
      className={styles.loginContainer}
      minH={"110vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          {/* <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text> */}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input id="email" type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input id="password" type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link to="/" color={"blue.400"}>
                  Forgot password?
                </Link>
              </Stack>

              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSignIn}
              >
                {loading ? <p>Loading...</p> : "Sign in"}
              </Button>

              <Center p={2}>
                <Stack spacing={2} align={"center"} maxW={"md"} w={"full"}>
                  {/* Facebook */}
                  {/* <Button w={'full'} colorScheme={'facebook'} leftIcon={<FaFacebook />}>
          <Center>
            <Text>Continue with Facebook</Text>
          </Center>
        </Button> */}

                  {/* Google */}
                  <Button
                    w={"full"}
                    variant={"outline"}
                    leftIcon={<FcGoogle />}
                    onClick={GoogleLogin}
                  >
                    <Center>
                      <Text>Sign in with Google</Text>
                    </Center>
                  </Button>

                  {/* Github */}
                  <Button
                    w={"full"}
                    colorScheme={"messenger"}
                    leftIcon={<AiOutlineGithub />}
                    onClick={GitHubLogin}
                  >
                    <Center>
                      <Text>Sign in with Github</Text>
                    </Center>
                  </Button>

                  {/* Messenger */}
                  {/* <Button w={'full'} colorScheme={'messenger'} leftIcon={<SiMessenger />}>
          <Center>
            <Text>Send to Messenger</Text>
          </Center>
        </Button> */}
                </Stack>
              </Center>

              <Text align={"center"}>
                Don't have an account?{" "}
                <Link to="/user/signup" color={"blue.400"}>
                  <u>Click Here</u>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
