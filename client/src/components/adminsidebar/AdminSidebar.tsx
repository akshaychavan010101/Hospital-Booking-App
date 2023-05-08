import logo from "../../assets/logo.png"
import styles from "./AdminSidebar.module.css"
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    // Icon,
    useColorModeValue,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
} from '@chakra-ui/react';
import {
    FiMenu,
} from 'react-icons/fi';
// import { IconType } from 'react-icons';
// import { ReactText } from 'react';
import { Link } from "react-router-dom";
interface Myprops {
    setHome : any,
    setAdmins :any,
    setPatients :any,
    setDoctors : any,
    setAppointments : any
  }

export default function AdminSidebar(props: Myprops) {
   
    
    const { isOpen, onOpen, onClose } = useDisclosure();
  

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} >
            <SidebarContent
                onClose={() => onClose}

                display={{ base: 'none', md: 'block' }}

                states = {props}
               
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}

                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} states={props} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen}/>
            <Box ml={{ base: 0, md: 60 }}>
                { }
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
    states : any
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {    

  const {setHome , setAdmins , setAppointments , setDoctors , setPatients} = rest.states;

    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    <Link to={"/"}>
                        <img width={"90px"} src={logo} alt="" />
                    </Link>
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
           <h1 style={{fontSize:"large",padding:"10px 0px 15px 40px"}} className={styles.navlink} onClick={()=>{
            setHome(true);
            setAdmins(false);
            setPatients(false);
            setDoctors(false);
            setAppointments(false);
               
           }}>Home</h1>
           <h1 style={{fontSize:"large",padding:"10px 0px 15px 40px"}} className={styles.navlink} onClick={()=>{
                setHome(false);
                setAdmins(true);
                setPatients(false);
                setDoctors(false);
                setAppointments(false);
           }}>Manage Admins</h1>
           <h1 style={{fontSize:"large",padding:"10px 0px 15px 40px"}} className={styles.navlink} onClick={()=>{
                setHome(false);
                setAdmins(false);
                setPatients(false);
                setDoctors(true);
                setAppointments(false);
                 
           }}>Manage Doctors</h1>
           <h1 style={{fontSize:"large",padding:"10px 0px 15px 40px"}} className={styles.navlink} onClick={()=>{
                setHome(false);
                setAdmins(false);
                setPatients(true);
                setDoctors(false);
                setAppointments(false);

           }}>All Patients</h1>
           <h1 style={{fontSize:"large",padding:"10px 0px 15px 40px"}} className={styles.navlink} onClick={()=>{
                setHome(false);
                setAdmins(false);
                setPatients(false);
                setDoctors(false);
                setAppointments(true);

           }}>All Appointments</h1>
        </Box>
    );
};



interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}>
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
                Logo
            </Text>
        </Flex>
    );
};