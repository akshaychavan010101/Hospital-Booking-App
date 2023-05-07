import styles from "./Notification.module.css";
import { Box, Heading, Text, Stack, StackDivider, Card, CardHeader, CardBody, Button } from '@chakra-ui/react';
import {useState, useEffect} from 'react'


function Notify() {
    const [notify, setNotify] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const baseURL = "https://jittery-shirt-tuna.cyclic.app";

    let token: string = sessionStorage.getItem('token') || ''
    
    useEffect(() => {
        fetch(`${baseURL}/appointments/notifications`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization" : `${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setNotify(data.notifications)
            setLoading(false)
        })
        .catch(err => {
            console.log(err);
            setError(true)
            setLoading(false)
        })
    }, [])
  

  return (
    <Card className= {styles.cards_compo}>
    <CardHeader className={styles.clear_notify}>
      <Heading size='md'>Notifications 🔔</Heading>
      <Button disabled = {disabled} onClick={()=>{

          if(notify.length === 0){
             setDisabled(true);
             return;
          }else{
            setDisabled(false);
          }

           const payload = {
                "ids" : [
                    ...notify.map((item) => item["id"])
                ]
           }
           setLoading(true)
            fetch(`${baseURL}/appointments/clear-notifications`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization" : `${token}`
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(()=>{
                setNotify([])
                setLoading(false)
            })
            .catch(()=>{
                setError(true)
                setLoading(false)
            })
      }}>Clear</Button>
    </CardHeader>
    <CardBody>
      <Stack divider={<StackDivider />} spacing='4'>
        {
         loading ? <h2>Loading...</h2> : error ? <h1>Oopss..☹️ something went wrong</h1> :   notify && notify.length > 0 ? notify.map((item) => (
                <Box key={item["id"]} className={styles.box}>
                        <div className= {styles.blue_dot} >
                           <p>🔵</p> 
                        </div>
                        <div className= {styles.main_containt}>
                            <Heading size='xs' textTransform='uppercase'>
                              Appointments
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                               Appointment with {item["doctorName"]} at {item["time"]}
                               <br/>
                               Date : {item["date"]}
                            </Text>
                        </div>
                 </Box>
            )) : <div className= {styles.no_notify}>
                <p>No Notifications 🤗</p>
                 
            </div>
        }
      </Stack>
    </CardBody>
  </Card>
  )
}

export default Notify