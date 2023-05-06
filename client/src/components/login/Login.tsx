import styles from "./login.module.css";
// import {useState,useEffect} from "react"
import { Link } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineGithub } from "react-icons/ai";
// import { FaFacebook } from 'react-icons/fa';
// import { SiLinkedin, SiMessenger } from 'react-icons/si';
// import { Box, Button, Center, Stack, Text } from '@chakra-ui/react';
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
  } from '@chakra-ui/react';

  export default function Login() {
    const baseURL = "https://jittery-shirt-tuna.cyclic.app"
    // const payload const [submitted, setSubmitted] = useState(false);
  // const [email, setEmail] = useState("")
  // const [pass, setPass] = useState("")
  // const [login, setLogin] = useState(false);

  async function handleSignIn() {

    const email: string = (document.getElementById('email') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    
    if(email == "" || password == ""){
      alert("Fill All Details")
      return;
    }

    try {
      const payload = { email, password };
      console.log(payload);

      let fData = await fetch(`${baseURL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(payload)
      })

      const data = await fData.json();
      console.log("HELLO",data);
      if(data.token){
        sessionStorage.setItem("token",JSON.stringify(data.token));
        sessionStorage.setItem("userName",JSON.stringify(data.userName));
        alert("Succefully Logged In")
      }else{
        alert("Your email is not registered")
      }
      

      // Swal.fire(data.message); // for alert 
      // if (data.message == "Login Successful") {
      //   setLogin(true);
      // }

    } catch (error) {
      alert(error)
    }

  }
    return (
      <Flex className={styles.loginContainer}
        minH={'120vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            {/* <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text> */}
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email" >
                <FormLabel>Email address</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input id="password" type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link to="/" color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }} onClick={handleSignIn}>
                  Sign in
                </Button>

                <Center p={8}>
      <Stack spacing={4} align={'center'} maxW={'md'} w={'full'}>
        {/* Facebook */}
        {/* <Button w={'full'} colorScheme={'facebook'} leftIcon={<FaFacebook />}>
          <Center>
            <Text>Continue with Facebook</Text>
          </Center>
        </Button> */}

        {/* Google */}
        <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
          <Center>
            <Text>Sign in with Google</Text>
          </Center>
        </Button>

        {/* Github */}
        <Button w={'full'} colorScheme={'messenger'} leftIcon={<AiOutlineGithub />}>
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
                  Don't have an account? <Link to="/user/signup" color={'blue.400'}> Click Here</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }