import {ChakraProvider} from "@chakra-ui/react"

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Create from "./pages/Create";
import Home from "./pages/Home";
import EditTodo from "./pages/EditTodo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState, createContext } from "react";
import TodoContextProvider from "./context/TodoContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContextProvider from "./context/UserContextProvider";
import useUserContext from "./hooks/useUserContext";
import { UserContextInterface } from "./context/UserContextProvider";
import ProtectedRoute from "./components/ProtectedRoute";

export type Todo = {


  id: string;
  title: string;
  content: string;

}





function App() {


  
      
 
  const client = new QueryClient();
  

  


  return (

    <ChakraProvider>
        
      <QueryClientProvider client={client}>
       <UserContextProvider>
        <TodoContextProvider>

        <Router>

           <Navbar />


           <Routes>
              <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
              <Route path="/create" element={<ProtectedRoute><Create/></ProtectedRoute>}/>
              <Route path="/todo/:id" element={<ProtectedRoute><EditTodo/></ProtectedRoute>}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<Signup />}/>
           </Routes>


          
           
        </Router>
        </TodoContextProvider>
       </UserContextProvider>
      </QueryClientProvider>
        
    </ChakraProvider>
  )
}

export default App
