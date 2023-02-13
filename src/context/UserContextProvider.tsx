
import {createContext, useReducer, useState, SetStateAction, Dispatch, ReactElement} from "react";

const user = localStorage.getItem("user");


interface Props {


    children: ReactElement;
}


export interface User {


    email: string;
    username: string;
    token: string;

}


export interface UserContextInterface {

         
     user: User | null;
     setUser: Dispatch<SetStateAction<User | null>>;

}

export const userContext = createContext<UserContextInterface | null>(null);

const UserContextProvider = ({children}: Props) => {

    
    const [user, setUser] = useState<User | null>(null);


    
    return (

        <userContext.Provider value={{ user, setUser }}>
            
            {children}

        </userContext.Provider>
    )
}


export default UserContextProvider;