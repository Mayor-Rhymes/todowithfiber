import {
    Flex,
    Spacer,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Textarea,
    Input,
    Button,
    Text,
    useToast
    
  } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react';
import useUserContext from '../hooks/useUserContext';
import { UserContextInterface } from '../context/UserContextProvider';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';


interface FormInfo {


    text: string;
    link: string;
    action: string;
    mainaction: string;
}
const Form = ({text, link, action, mainaction}: FormInfo) => {

   const toast = useToast();
   const [email, setEmail] = useState<string>("")
   const [username, setUsername] = useState<string>("")
   const [password, setPassword] = useState<string>("")
   const navigate = useNavigate();

   const {user, setUser} = useUserContext() as UserContextInterface;




   const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {

       e.preventDefault();
       if(email && username && password){

           const response = await Axios.post(`http://localhost:4000/api/v1/user/${mainaction.toLowerCase()}`, {

                 email,
                 username,
                 password
            })

            if (response.status !== 200){
                toast({

                    title: "hello",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                   })
                  
            } else {

                const {user, token, message} = response.data
                setUser({email: user.email, username: user.username, token:token});
                localStorage.setItem("user", JSON.stringify({email: user.email, username: user.username, token:token}));
                toast({

                    title: message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                 })
            
                 navigate("/");

            }
            



       } 




   }

   return (

       <form 
       onSubmit={handleSubmit}
       style=
       {{
         display: "flex", 
         flexDirection: "column", 
         gap: "20px", 
         width: "75%", 
         marginInline: "auto",
         marginTop: "100px"
       
       }}
       
       >
         <FormControl>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" height="50px" fontSize="2xl" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormHelperText>Your email address is for express identification</FormHelperText>

         </FormControl>


         <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" height="50px" fontSize="2xl" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <FormHelperText>Please enter your username</FormHelperText>
         </FormControl>


         <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" height="50px" fontSize="2xl" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <FormHelperText>Please enter your password</FormHelperText>
         </FormControl>



         <Button type="submit" backgroundColor="blackAlpha.800" color="white" style={{ transition: "all 150ms ease-in-out 200ms" }}>{mainaction}</Button>



         <Text textAlign="center">{text} <Link to={`/${link}`}>{action}</Link></Text>

       </form>
       
   )


}

export default Form;