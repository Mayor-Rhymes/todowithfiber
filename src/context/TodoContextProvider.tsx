import {createContext, FC, ReactNode, useEffect, useState, Dispatch, SetStateAction} from "react";
import  Axios from "axios";
import {useQuery} from "@tanstack/react-query";


interface Props{
    

   children: ReactNode;

}


export type Todo = {


    id: string,
    title: string,
    content: string,
  
  }


export interface ContextValues{


      todos: Todo[];
      setTodos: Dispatch<SetStateAction<Todo[]>> ;
      
      

}
  
  
export const TodoContext = createContext<ContextValues | null>(null);




const TodoContextProvider = ({children} : Props) => {


    
    

    



    const [todos, setTodos] = useState<Todo[]>([]);
    
   


    

    return (

        <TodoContext.Provider value={{ todos, setTodos }}>


            {children}

        </TodoContext.Provider>
        

    )


}


export default TodoContextProvider;