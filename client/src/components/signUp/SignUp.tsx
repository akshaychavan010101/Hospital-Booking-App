import { Link } from "react-router-dom"
// import { FcGoogle } from 'react-icons/fc';
// import { Center} from '@chakra-ui/react';
import Swal from "sweetalert2";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  // HStack,
  InputRightElement,
  Stack,
  // VStack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  // Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function SignupCard() {
  // let baseUrl = "https://jittery-shirt-tuna.cyclic.app"
  const frontendURl = "https://findmydoctor.onrender.com";

  const [showPassword, setShowPassword] = useState(false);

  async function handleSignup() {
    let name: string = (document.getElementById("username") as HTMLInputElement).value;
    let email: string = (document.getElementById("userEmail") as HTMLInputElement).value;
    let password: string = (document.getElementById("password") as HTMLInputElement).value;
    let mobile: string = (document.getElementById("mobile_number") as HTMLInputElement).value;

    if (email == "" || password == "" || name == "") {

      Swal.fire("Fill All The Details");

      return;
    }

    let obj = {
      name,
      email,
      password,
      mobile
    }
    try {
      let res = await fetch('https://jittery-shirt-tuna.cyclic.app/user/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(obj)
      });

      let data = await res.json();
      console.log(data);
      if (data.msg == "User created") {
        Swal.fire("User Registered");
        window.location.href =`${frontendURl}/user/login`
      }

    } catch (error:any) {
      Swal.fire("Failed to Register, try again");

    }
  }

  return (
    <Flex
      minH={'110vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            {/* <VStack> */}
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input id="username" type="text" />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="Mobile_number" isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <Input id="mobile_number" type="text" />
              </FormControl>
            </Box>
            {/* </VStack> */}
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input id='userEmail' type="email" isRequired/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input id='password' type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }} onClick={handleSignup}>
                Sign up
              </Button>
            </Stack>

            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link to="/user/login" color={'blue.400'} ><u>Login</u></Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}