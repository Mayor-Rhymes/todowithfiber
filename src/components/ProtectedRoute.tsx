import { ReactElement } from "react";
import useUserContext from "../hooks/useUserContext";
import { UserContextInterface } from "../context/UserContextProvider";
import { Navigate } from "react-router-dom";


interface Props {


    children: ReactElement
}


const ProtectedRoute = ({children}: Props) => {

   const {user} = useUserContext() as UserContextInterface
   
   if(!user){
   
      return <Navigate to="/login"/>
   } else {
     return (children);
   }
}


export default ProtectedRoute;