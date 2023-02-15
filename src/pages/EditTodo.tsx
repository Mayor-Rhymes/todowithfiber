
import {useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { type Todo } from "../App";
import {useToast} from "@chakra-ui/react"
import Axios from "axios";
import useUserContext from "../hooks/useUserContext"
import { UserContextInterface } from "../context/UserContextProvider";
import {Flex, FormControl, FormLabel, Input, Textarea, FormHelperText, Button} from "@chakra-ui/react"


const EditTodo = () => {

   

    const {id} = useParams();
    const {user} = useUserContext() as UserContextInterface;
    
    const navigate = useNavigate();
    const toast = useToast();


    const [todo, setTodo] = useState<Todo | null>(null);
    const [title, setTitle] = useState<string | undefined>(todo?.title);
    const [content, setContent] = useState<string | undefined>(todo?.content);
    
    const getTodo = async () => {

        const response = await Axios.get(`https://fiberbackendstructure-production.up.railway.app/api/v1/todo/${id}`, {

        headers: {
 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`
        }
     })
        setTodo(response.data.result)
         
    }


    const handleEdit = async () => {

         if(title || content){
                 
            const response = await Axios.patch(`https://fiberbackendstructure-production.up.railway.app/api/v1/todo/${id}`, {

              title,
              content,
            }, 
            {

               headers: {
        
                 "Content-Type": "application/json",
                 "Authorization": `Bearer ${user?.token}`
               }
            }
            
            )

            if(response.data?.message == "document has been updated"){

                 toast({

                    title: "Note edited",
                    description: "Note was edited successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true

                 })
                 navigate("/");

            }
 
            



         } else{


            toast({

                title: "Note not edited",
                description: "The right parameters for creating the notes were not created",
                status: "error",
                duration: 3000,
                isClosable: true,
            })

         }
         


         

    }




    useEffect(() => {

         getTodo()



    }, [todo])


    console.log(todo);

    

    return(
     

        <Flex marginTop="10px" paddingInline="4.5rem" paddingBlock="2.5rem" direction="column" justify="center" align="center" w={{base: "100%", md:"75%", lg:"50%"}} marginInline="auto" gap={10}> 
          
          <FormControl>
            <FormLabel fontSize={{base: "xl", md: "2xl", lg:"4xl"}}>Title</FormLabel>
            <Input type="text" height="50px" fontSize="2xl" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <FormHelperText fontSize={{ base: "sm", md: "md", lg: "lg" }}>Title for your todos</FormHelperText>
          </FormControl>


          <FormControl>
             <FormLabel fontSize={{base: "xl", md: "2xl", lg:"4xl"}}>Content</FormLabel>
             <Textarea height="200px" fontSize="2xl" resize="none" value={content} onChange={(e) => setContent(e.target.value)}/>
             <FormHelperText fontSize={{ base: "sm", md: "md", lg: "lg" }}>Content for your todos</FormHelperText>
          </FormControl>


          <Button backgroundColor="blackAlpha.800" color="white" onClick={handleEdit}>Edit Note</Button>
   </Flex>
        
        

    )

}


export default EditTodo;