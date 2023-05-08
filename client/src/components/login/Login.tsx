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
  const frontendUrl = "http://localhost:5173";
  const baseURL = "https://jittery-shirt-tuna.cyclic.app";
  // const payload const [submitted, setSubmitted] = useState(false);
  // const [email, setEmail] = useState("")
  // const [pass, setPass] = useState("")
  const [login, setLogin] = useState(false);

  async function handleSignIn() {
    const email: string = (document.getElementById("email") as HTMLInputElement)
      .value;
    const password: string = (
      document.getElementById("password") as HTMLInputElement
    ).value;

    if (email == "" || password == "") {
      Swal.fire("Fill All Details");

      return;
    }

    try {
      const payload = { email, password };
      console.log(payload);

      let fData = await fetch(`${baseURL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(payload),
      });

      const data = await fData.json();
      // console.log("HELLO",data);
      if (data.token) {
        sessionStorage.setItem("token",(data.token));
        sessionStorage.setItem("userName", (data.userName));
        setLogin(true);
        Swal.fire(data.msg);
        if(data.msg == "Login Successful"){
          window.location.href = `${frontendUrl}`
        }
      } else {
        setLogin(false);
        Swal.fire("Your email is not registered");
      }
    } catch (error) {
      alert(error);
    }
  }

  function GitHubLogin() {
    
        window.location.href = "https://github.com/login/oauth/authorize?client_id=d538c648012f0c82fe00";
       // Set a persistent cookie with an expiration date
       const expirationDate = new Date();
       expirationDate.setDate(expirationDate.getDate() + 30); // 30 days from now
       document.cookie = "userName=; expires=" + expirationDate.toUTCString();

       // Read the value of the "myCookie" cookie
       const cookies = document.cookie.split(';');
       for(let i=0; i<cookies.length; i++) {
         const cookie = cookies[i].trim();
         if (cookie.startsWith("userName=")) {
           const cookieValue = cookie.substring("userName=".length, cookie.length);
           console.log(`Cookie value: ${cookieValue}`);
           localStorage.setItem("userName", cookieValue);
           break;
         }
       }

       
      
      
      fetch(`${baseURL}/get-cookies`,{
        method: "GET",
      })
      .then((res)=>{
        return res.json();
      })
      .then((cookie)=>{
        sessionStorage.setItem("token", cookie.token);
        sessionStorage.setItem("userName", cookie.userName);
      })
      .catch((err)=>{
        console.log(err);
      })
  }

      async function GoogleLogin() {
       

       // Set a persistent cookie with an expiration date
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 30); // 30 days from now
          document.cookie = "myCookie=value; expires=" + expirationDate.toUTCString();

          // Read the value of the "myCookie" cookie
          const cookies = document.cookie.split(';');
          for(let i=0; i<cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith("userName=")) {
              const cookieValue = cookie.substring("userName=".length, cookie.length);
              console.log(`Cookie value: ${cookieValue}`);
              sessionStorage.setItem("userName", cookieValue);
              break;
            }
          }

          window.location.href =
          "https://jittery-shirt-tuna.cyclic.app/user/auth/google";
  

     
        // fetch(`${baseURL}/user/get-cookies`,{
        //   method: "GET",
        // })
        // .then((res)=>{
        //   return res.json();
        // })
        // .then((cookie)=>{
        //   console.log(cookie);
        //   sessionStorage.setItem("token", cookie.token);
        //   // sessionStorage.setItem("userName", cookie.userName);
        // })
        // .catch((err)=>{
        //   console.log(err);
        // })
      

     
        fetch(`${baseURL}/get-cookies`,{
        method: "GET",
      })
      .then((res)=>{
        return res.json();
      })
      .then((cookie)=>{
        sessionStorage.setItem("token", cookie.token);
        sessionStorage.setItem("userName", cookie.userName);
      })
      .catch((err)=>{
        console.log(err);
      })

     
  }

  return (
    <Flex
      className={styles.loginContainer}
      minH={"120vh"}
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
                Sign in
              </Button>

              <Center p={8}>
                <Stack spacing={4} align={"center"} maxW={"md"} w={"full"}>
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
                  {" "}
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
