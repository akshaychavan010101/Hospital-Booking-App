// // import { ReactNode } from 'react';
// import styles from "./Navbar.module.css";
// import {
//   Box,
//   Flex,
//   Avatar,
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuDivider,
//   useColorModeValue,
//   Stack,
//   useColorMode,
//   Center,
//   // HamburgerIcon,
//   // Collapse,
//   Icon,
//   // useDisclosure,
// } from '@chakra-ui/react';
// import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
// // import { css } from '@emotion/react';
// // import { Link } from "react-router-dom";

// // const NavLink = ({ children }: { children: ReactNode }) => (
// //   <Link
// //     px={2}
// //     py={1}
// //     rounded={'md'}
// //     _hover={{
// //       textDecoration: 'none',
// //       bg: useColorModeValue('gray.200', 'gray.700'),
// //     }}
// //     href={'#'}>
// //     {children}
// //   </Link>
// // );

// export default function Nav() {
//   const { colorMode, toggleColorMode } = useColorMode();
//   // const { isOpen, onOpen, onClose } = useDisclosure();
//   return (
//     <>
//       <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} >
//         <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
//           <Box>Logo</Box>

//           <Flex alignItems={'center'} display={'flex'} justifyContent={'space-evenly'} width={'40%'} className={styles.navBtn} whiteSpace={'nowrap'}>
//             <Box className={styles.navBtnChild} padding={'6px 8px'} _hover={{backgroundColor:'rgb(218, 230, 230)'}}>Home</Box>
//             <Box className={styles.navBtnChild} padding={'6px 8px'} _hover={{backgroundColor:'rgb(218, 230, 230)'}}>Our Doctors</Box>
//             <Box className={styles.navBtnChild} padding={'6px 8px'} _hover={{backgroundColor:'rgb(218, 230, 230)'}}>Our Services</Box>
//             <Box className={styles.navBtnChild} padding={'6px 8px'} _hover={{backgroundColor:'rgb(218, 230, 230)'}}>Appointments</Box>
//             <Box className={styles.navBtnChild} padding={'6px 8px'} _hover={{backgroundColor:'rgb(218, 230, 230)'}}>About us</Box>
//           </Flex>
//           <Flex alignItems={'center'} >
//             <Stack direction={'row'} spacing={7}>
//               <Button onClick={toggleColorMode} >
//                 {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
//               </Button>
//               <Menu>
//                 <MenuButton
//                   as={Button}
//                   rounded={'full'}
//                   variant={'link'}
//                   cursor={'pointer'}
//                   outline={"auto"}
//                   minW={0}>
//                   <Avatar
//                     size={'sm'}
//                     src={'https://avatars.dicebear.com/api/male/username.svg'}
//                   />
//                 </MenuButton>
//                 <MenuList alignItems={'center'}>
//                   <br />
//                   <Center>
//                     <Avatar
//                       size={'2xl'}
//                       src={'https://avatars.dicebear.com/api/male/username.svg'}
//                     />
//                   </Center>
//                   <br />
//                   <Center>
//                     <p>Username</p>
//                   </Center>
//                   <br />
//                   <MenuDivider />
//                   <MenuItem>Your Servers</MenuItem>
//                   <MenuItem>Account Settings</MenuItem>
//                   <MenuItem>Logout</MenuItem>
//                 </MenuList>
//               </Menu>
//             </Stack>
//           </Flex>
//         </Flex>
//       </Box>
//     </>
//   );
// }

// import { ReactNode } from 'react';
// import styles from "./Navbar.module.css";
// import {
//   Box,
//   Flex,
//   Avatar,
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuDivider,
//   useColorModeValue,
//   Stack,
//   useColorMode,
//   Center,
//   Icon,
// } from '@chakra-ui/react';
// import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

// export default function Nav() {
//   const { colorMode, toggleColorMode } = useColorMode();

//   return (
//     <>
//       <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
//         <Flex
//           h={16}
//           alignItems={'center'}
//           justifyContent={'space-between'}
//           wrap={{ base: 'wrap', md: 'nowrap' }}
//         >
//           <Box>Logo</Box>

//           <Flex
//             alignItems={'center'}
//             display={{ base: 'none', md: 'flex' }}
//             justifyContent={'space-evenly'}
//             width={'40%'}
//             className={styles.navBtn}
//             whiteSpace={'nowrap'}
//           >
//             <Box
//               className={styles.navBtnChild}
//               padding={'6px 8px'}
//               _hover={{ backgroundColor: 'rgb(218, 230, 230)' }}
//             >
//               Home
//             </Box>
//             <Box
//               className={styles.navBtnChild}
//               padding={'6px 8px'}
//               _hover={{ backgroundColor: 'rgb(218, 230, 230)' }}
//             >
//               Our Doctors
//             </Box>
//             <Box
//               className={styles.navBtnChild}
//               padding={'6px 8px'}
//               _hover={{ backgroundColor: 'rgb(218, 230, 230)' }}
//             >
//               Our Services
//             </Box>
//             <Box
//               className={styles.navBtnChild}
//               padding={'6px 8px'}
//               _hover={{ backgroundColor: 'rgb(218, 230, 230)' }}
//             >
//               Appointments
//             </Box>
//             <Box
//               className={styles.navBtnChild}
//               padding={'6px 8px'}
//               _hover={{ backgroundColor: 'rgb(218, 230, 230)' }}
//             >
//               About us
//             </Box>
//           </Flex>

//           <Flex alignItems={'center'}>
//             <Stack direction={'row'} spacing={7}>
//               <Button onClick={toggleColorMode}>
//                 {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
//               </Button>
//               <Menu>
//                 <MenuButton
//                   as={Button}
//                   rounded={'full'}
//                   variant={'link'}
//                   cursor={'pointer'}
//                   outline={'auto'}
//                   minW={0}
//                 >
//                   <Avatar
//                     size={'sm'}
//                     src={'https://avatars.dicebear.com/api/male/username.svg'}
//                   />
//                 </MenuButton>
//                 <MenuList alignItems={'center'}>
//                   <br />
//                   <Center>
//                     <Avatar
//                       size={'2xl'}
//                       src={'https://avatars.dicebear.com/api/male/username.svg'}
//                     />
//                   </Center>
//                   <br />
//                   <Center>
//                     <p>Username</p>
//                   </Center>
//                   <br />
//                   <MenuDivider />
//                   <MenuItem>Your Servers</MenuItem>
//                   <MenuItem>Account Settings</MenuItem>
//                   <MenuItem>Logout</MenuItem>
//                 </MenuList>
//               </Menu>
//             </Stack>
//           </Flex>
//         </Flex>
//         </Box>
//         </>
//   )}


// import { ReactNode } from 'react';
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
// import { Link as ReachLink } from '@reach/router';

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  // MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  // Icon,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
// import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Nav() {
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
              _hover={{ backgroundColor: 'rgb(218, 230, 230)' }}
            >
              Home
            </Box>
            <Box
              className={styles.navBtnChild}
              padding={'6px 8px'}
              _hover={{ backgroundColor: 'rgb(218, 230, 230)' }}
            >
              Our Doctors
            </Box>
            <Box
              className={styles.navBtnChild}
              padding={'6px 8px'}
              _hover={{ backgroundColor: 'rgb(218, 230, 230)' }}
            >
              Our Services
            </Box>
            <Box
              className={styles.navBtnChild}
              padding={'6px 8px'}
              _hover={{ backgroundColor: 'rgb(218, 230, 230)' }}
            >
              Appointments
            </Box>
            <Box
              className={styles.navBtnChild}
              padding={'6px 8px'}
              _hover={{ backgroundColor: 'rgb(218, 230, 230)' }}
            >
              About us
            </Box>
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
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
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