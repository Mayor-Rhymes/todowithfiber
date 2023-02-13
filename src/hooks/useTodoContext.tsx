
import { useContext } from "react"
import { TodoContext } from '../context/TodoContextProvider';


export const useTodoContext = () => {
   

    const context = useContext(TodoContext)
    
    if(!context){

        return "This component does not lie within the context provider"
    } else {

        return context
    }




}