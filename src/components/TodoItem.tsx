import {Box, Text, Flex, Button, Spacer} from "@chakra-ui/react"
import { type Todo } from "../App";
import {Link} from "react-router-dom";
import {FC} from 'react'
import Axios from "axios";
import { useTodoContext } from "../hooks/useTodoContext";
import { ContextValues } from "../context/TodoContextProvider";
import {useToast} from "@chakra-ui/react";
import useUserContext from "../hooks/useUserContext"
import { UserContextInterface } from "../context/UserContextProvider";

interface Props{


    todo: Todo
}

const TodoItem: FC<Props> = ({todo}) => {


    const {setTodos, todos} = useTodoContext() as ContextValues
    const {user} = useUserContext() as UserContextInterface;
    
    const {id, title, content} = todo;

    const toast = useToast();


    const handleDelete = async () => {

        const response = await Axios.delete(`http://localhost:4000/api/v1/todo/${id}`, {

        headers: {
 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`
        }
     })
        
        if(response.data?.message == "document has been deleted"){

           const newTodos = todos.filter(todo => todo.id !== id)
           setTodos(newTodos)
           
           toast({

            title: "Note deleted",
            description: "Note has been successfully deleted",
            status: "success",
            duration: 3000,
            isClosable: true,
           })
           
            
        }
        
    }




    return (

        <Box 
        position="relative" 
        key={id} 
        boxShadow="xl" 
        paddingBlock={10} 
        paddingInline={3} 
        borderRadius="lg"
    
        >

        <Text fontSize="4xl">{title}</Text>
        <Text fontSize="2xl" marginBottom={10}>{content}</Text>
        

        <Flex position="absolute" bottom={6} justify="space-between" width="50%">

           <Button onClick={handleDelete}>Delete</Button>
           <Spacer />
           <Button><Link to={`/todo/${id}`}>Edit</Link></Button>
        </Flex>
    
    
    
      </Box>
    
    
    )
    
}

export default TodoItem;