import logo from "../../assets/logo.png"
import styles from "./Sidebar.module.css"
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


export default function Sidebar(props: any) {


    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} >
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
                state={props}
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
                    <SidebarContent onClose={onClose} state={props} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }}>
                { }
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
    state: any;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {

    const { setProfile, setAppointments } = rest.state;

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
            <h1 style={{ fontSize: "large", padding: "10px 0px 15px 40px" }} className={styles.navlink}><Link to={"/"}>Home</Link></h1>
            <h1 style={{ fontSize: "large", padding: "10px 0px 15px 40px" }} className={styles.navlink}><Link to={"/services"}>Services</Link></h1>
            <h1 style={{ fontSize: "large", padding: "10px 0px 15px 40px" }} className={styles.navlink}><Link to={"/ourdoctors"}>Doctors</Link></h1>
            <h1 style={{ fontSize: "large", padding: "10px 0px 15px 40px" }} className={styles.navlink}><Link to={"/notifications"}>Notifications</Link></h1>
            <h1 style={{ fontSize: "large", padding: "10px 0px 15px 40px" }} className={styles.navlink} onClick={() => {setAppointments(false); setProfile(true) }}>Profile</h1>
            <h1 style={{ fontSize: "large", padding: "10px 0px 15px 40px" }} className={styles.navlink} onClick={() => {setProfile(false); setAppointments(true) }}>Appointments</h1>

        </Box>
    );
};

// interface NavItemProps extends FlexProps {
//     icon: IconType;
//     children: ReactText;
// }
// const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
//     return (
//         <Link to={"#"} style={{ textDecoration: 'none' }}>
//             <Flex
//                 align="center"
//                 p="4"
//                 mx="4"
//                 borderRadius="lg"
//                 role="group"
//                 cursor="pointer"
//                 _hover={{
//                     bg: 'cyan.400',
//                     color: 'white',
//                 }}
//                 {...rest}>
//                 {icon && (
//                     <Icon
//                         mr="4"
//                         fontSize="16"
//                         _groupHover={{
//                             color: 'white',
//                         }}
//                         as={icon}
//                     />
//                 )}
//                 {children}
//             </Flex>
//         </Link>
//     );
// };

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