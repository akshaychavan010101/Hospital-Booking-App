
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
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
// import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} className={styles.navbarContainer}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          wrap={{ base: 'wrap', md: 'nowrap' }}  // Added wrap property
        >
          <Box marginLeft={'30px'}>
            <Link to='/'>
              <img src={logo} alt="Logo" width={'100px'} />
            </Link>
          </Box>

          <Flex
            alignItems={'center'}
            display={{ base: 'none', md: 'flex' }}  // Added display property
            justifyContent={'space-evenly'}
            width={'40%'}  // Added width property
            className={styles.navBtn}
            whiteSpace={'nowrap'}  // Added whiteSpace property
          >
            <Box
              className={styles.navBtnChild}
              padding={'6px 8px'}
              _hover={{ backgroundColor: 'rgb(218, 230, 230)',color:'black'  }}
            >
              Home
            </Box>
            <Box
              className={styles.navBtnChild}
              padding={'6px 8px'}
              _hover={{ backgroundColor: 'rgb(218, 230, 230)',color:'black'  }}
            >
              Our Doctors
            </Box>
            <Box
              className={styles.navBtnChild}
              padding={'6px 8px'}
              _hover={{ backgroundColor: 'rgb(218, 230, 230)',color:'black'  }}
            >
              Our Services
            </Box>
            <Box
              className={styles.navBtnChild}
              padding={'6px 8px'}
              _hover={{ backgroundColor: 'rgb(218, 230, 230)',color:'black' }}
            >
              Appointments
            </Box>
            <Link to="/user/login">
              <Box
                className={styles.signin}
                padding={'6px 8px'}
                _hover={{ backgroundColor: 'rgb(218, 230, 230)' }}
              >
                SignIn
              </Box>
            </Link>

          </Flex>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  outline={'auto'}
                  minW={0}
                >
                  <Avatar
                  outline={'auto'}
                    size={'sm'}
                    src={patientLogo}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'xl'}
                      src={patientLogo}
                      margin={'0 auto'}
                    />
                  </Center>
                  <br />
                  <Box fontWeight={'bold'} textAlign={'center'}>
                    John Doe
                  </Box>
                  <Box textAlign={'center'}>john.doe@example.com</Box>
                  <br />
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}