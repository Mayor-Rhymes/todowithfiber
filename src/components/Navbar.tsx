
import {Flex, Spacer, Text, Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
import {UserContextInterface} from "../context/UserContextProvider";



const Navbar = () => {

     const {user, setUser} = useUserContext() as UserContextInterface;
     
     const handleLogout = () => {

         setUser(null)

     } 
     
     return(

        <Flex width="100%" height="90px" align="center" justify="space-between" paddingInline="1.5rem" backgroundColor="black" color="white">


            <Text fontSize={{base: "xl", md: "2xl", lg:"4xl"}}><Link to="/">TodoWithFiber</Link></Text>


            <Flex flexGrow="3" justify="space-evenly" fontSize={{base: "md", md: "lg", lg:"xl"}}>
               
               <Link to="/">Home</Link>

                

               {user && <Link to="/create">Create Note</Link>}
               {user && <Button colorScheme="red" onClick={handleLogout}>Logout</Button>}




               {!user && <Link to="/login">Login</Link>}


               {!user && <Link to="/signup">Signup</Link>}
               
            </Flex>

        </Flex>
     )
}

export default Navbar;