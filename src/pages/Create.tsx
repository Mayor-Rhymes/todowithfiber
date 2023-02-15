
import {
    Flex,
    Spacer,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Textarea,
    Input,
    Button
  } from '@chakra-ui/react'
import {useState} from 'react';
import {useNavigate} from "react-router-dom"
import Axios from "axios";
import {useToast} from "@chakra-ui/react";
import useUserContext from "../hooks/useUserContext"
import { UserContextInterface } from "../context/UserContextProvider";


const Create = () => {


    const [title, setTitle] = useState<string | undefined>("");
    const [content, setContent] = useState<string | undefined>("");
    const navigate = useNavigate();
    const toast = useToast();
    const {user} = useUserContext() as UserContextInterface;



    const handleSubmit = async () => {


        if(title && content){


            const response = await Axios.post("https://fiberbackendstructure-production.up.railway.app/api/v1/todo", {

                title, 
                content
            }, {

              headers: {
       
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user?.token}`
              }
           });
           if(response.data?.message == "It was a success"){
            toast({

                title: "Note created",
                description: "Note has been created",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            navigate("/")
           } 
       

        } else {

                
            toast({

                title: "Note not created",
                description: "The right parameters for creating the notes were not created",
                status: "error",
                duration: 3000,
                isClosable: true,
            })

        }
        
    }


  return (
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


      <Button backgroundColor="blackAlpha.800" color="white" onClick={handleSubmit}>Add Note</Button>
   </Flex>
  )
}

export default Create