import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import patientLogo from "../../assets/patientLogo.png";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
  Collapse,
  VStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUserName = sessionStorage.getItem("userName");
    if (token && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    } else {
      setIsLoggedIn(false);
      setUserName("Sign In");
    }
  }, []);

  function Logout() {
    sessionStorage.clear();
    setIsLoggedIn(false);
    Swal.fire("Logout successfull").then(() => {
      setTimeout(() => {
        window.location.href = `/`;
      }, 1000);
    });
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        className={styles.navbarContainer}
      >
        <Flex
          position={"relative"}
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          wrap={{ base: "wrap", md: "nowrap" }} // Added wrap property
        >
          <Box
            className={styles.hamIcon}
            position={"absolute"}
            top={2}
            left={-2}
          >
            <IconButton
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              size="md"
              variant="ghost"
              aria-label="Toggle menu"
              onClick={toggleMenu}
            />
            <Collapse in={isOpen} animateOpacity>
              <VStack
                p={4}
                spacing={2}
                align="start"
                bg="gray.100"
                rounded="md"
                bgColor={useColorModeValue("gray.100", "gray.800")}
              >
                {/* Add your menu items here */}
                <Box
                  _hover={{
                    backgroundColor: useColorModeValue("gray.50", "gray.700"),
                    border: "1px solid silver",
                    borderRadius: "10",
                  }}
                  width={"100%"}
                  padding={1}
                >
                  <Link to={"/"}> Home</Link>
                </Box>
                <Box
                  _hover={{
                    backgroundColor: useColorModeValue("gray.50", "gray.700"),
                    border: "1px solid silver",
                    borderRadius: "10",
                  }}
                  width={"100%"}
                  padding={1}
                >
                  <Link to={"/ourdoctors"}> Our Doctors</Link>{" "}
                </Box>
                <Box
                  _hover={{
                    backgroundColor: useColorModeValue("gray.50", "gray.700"),
                    border: "1px solid silver",
                    borderRadius: "10",
                  }}
                  width={"100%"}
                  padding={1}
                >
                  <Link to={"/services"}> Our Services</Link>
                </Box>
                <Box
                  _hover={{
                    backgroundColor: useColorModeValue("gray.50", "gray.700"),
                    border: "1px solid silver",
                    borderRadius: "10",
                  }}
                  width={"100%"}
                  padding={1}
                >
                  <Link to={"/appointment"}> Appointments</Link>
                </Box>
                <Box
                  _hover={{
                    backgroundColor: useColorModeValue("gray.50", "gray.700"),
                    border: "1px solid silver",
                    borderRadius: "10",
                  }}
                  width={"100%"}
                  padding={1}
                >
                  <Link
                    to={"/user/login"}
                    style={{ display: isLoggedIn ? "none" : "block" }}
                  >
                    {" "}
                    Sign In
                  </Link>
                </Box>
              </VStack>
            </Collapse>
          </Box>
          <Box marginLeft={"25px"} className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="Logo" width={"100px"} />
            </Link>
          </Box>

          <Flex
            alignItems={"center"}
            display={{ base: "none", md: "flex" }} // Added display property
            justifyContent={"space-evenly"}
            width={"40%"} // Added width property
            className={styles.navBtn}
            whiteSpace={"nowrap"} // Added whiteSpace property
          >
            <Link to="/">
              <Box
                className={styles.navBtnChild}
                padding={"6px 8px"}
                _hover={{
                  backgroundColor: "rgb(218, 230, 230)",
                  color: "black",
                }}
              >
                Home
              </Box>
            </Link>
            <Link to="/ourdoctors">
              <Box
                className={styles.navBtnChild}
                padding={"6px 8px"}
                _hover={{
                  backgroundColor: "rgb(218, 230, 230)",
                  color: "black",
                }}
              >
                Our Doctors
              </Box>
            </Link>
            <Box
              className={styles.navBtnChild}
              padding={"6px 8px"}
              _hover={{ backgroundColor: "rgb(218, 230, 230)", color: "black" }}
            >
              <Link to="/services">Our Services</Link>
            </Box>
            <Box
              className={styles.navBtnChild}
              padding={"6px 8px"}
              _hover={{ backgroundColor: "rgb(218, 230, 230)", color: "black" }}
            >
              <Link to="/appointment">Appointments</Link>
            </Box>
            {isLoggedIn ? (
              <Box
                className={styles.navBtnChild}
                padding={"6px 8px"}
                // _hover={{ backgroundColor: "rgb(218, 230, 230)", color: "black" }}
              >
                Hie {userName}
              </Box>
            ) : (
              <Link to="/user/login">
                <Box
                  className={styles.signin}
                  padding={"6px 8px"}
                  _hover={{ backgroundColor: "rgb(218, 230, 230)" }}
                >
                  Sign In
                </Box>
              </Link>
            )}
          </Flex>
          <Link
            to="/notifications"
            style={{
              display: sessionStorage.getItem("login") ? "block" : "none",
            }}
          >
            🔔
          </Link>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  outline={"auto"}
                  minW={0}
                >
                  <Avatar outline={"auto"} size={"sm"} src={patientLogo} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size={"xl"} src={patientLogo} margin={"0 auto"} />
                  </Center>
                  <br />
                  {isLoggedIn ? (
                    <Box id="userName" fontWeight={"bold"} textAlign={"center"}>
                      Hi {userName}
                    </Box>
                  ) : (
                    <Box id="userName" fontWeight={"bold"} textAlign={"center"}>
                      Login to continue
                    </Box>
                  )}

                  {/* <Box textAlign={"center"}>john.doe@example.com</Box> */}
                  <br />
                  <MenuItem
                    style={{
                      display: sessionStorage.getItem("login")
                        ? "block"
                        : "none",
                    }}
                  >
                    Change Profile Photo
                  </MenuItem>
                  <MenuItem
                    style={{
                      display: sessionStorage.getItem("login")
                        ? "block"
                        : "none",
                    }}
                  >
                    <Link to="/user/dashboard">Dashboard</Link>
                  </MenuItem>
                  <MenuItem
                    onClick={Logout}
                    style={{ display: isLoggedIn ? "block" : "none" }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
