
import {Box, Text, Button, Flex, Spacer} from "@chakra-ui/react"

import { useState, FC , useEffect} from "react";
import {useTodoContext } from "../hooks/useTodoContext";
import { ContextValues } from "../context/TodoContextProvider";
import {useQuery} from "@tanstack/react-query";
import Axios from "axios";
import TodoItem from "../components/TodoItem";
import {type Todo} from "../App";
import useUserContext from "../hooks/useUserContext"
import { UserContextInterface } from "../context/UserContextProvider";






const Home = () => {

   const {todos, setTodos} = useTodoContext() as ContextValues;
   const {user} = useUserContext() as UserContextInterface;
   
   console.log(user);

   //Todo => Research what is wrong with useQuery
   const {data, isFetched} = useQuery(["todos"], async () => {

    const response = await Axios.get("https://fiberbackendstructure-production.up.railway.app/api/v1/todo", {

       headers: {

         "Content-Type": "application/json",
         "Authorization": `Bearer ${user?.token}`
       }
    })
    return response.data;
    
   })   




   // Todo => Refactor the code 
   const getTodos = async () => {

     const response = await Axios.get("https://fiberbackendstructure-production.up.railway.app/api/v1/todo", {

       headers: {

         "Content-Type": "application/json",
         "Authorization": `Bearer ${user?.token}`
       }
    })
     setTodos(response.data.result); 

   }



  


   useEffect(() => {

          getTodos()

      
   }, [])



  console.log(data?.result, todos)

  if(todos.length == 0) {

      return <Text fontSize="4xl" marginTop="200px" textAlign="center">Nothing dey here</Text>
  }

   
   return(


      <Box display="grid" gap={7} paddingBlock="2.3rem" paddingInline="2.3rem" gridTemplateColumns={{base:"repeat(1, 1fr)", md:"repeat(3, 1fr)", lg:"repeat(3, 1fr"}} >


          {todos?.map((todo: Todo) => 
            
             <TodoItem key={todo.id} todo={todo}/>
            
            
            )}




        


      </Box>
   )
}

export default Home;