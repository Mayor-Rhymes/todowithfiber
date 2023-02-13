
import { useContext } from "react"


import { userContext } from "../context/UserContextProvider"

const useUserContext = () => {


      const context = useContext(userContext);

      if(!context) {

        return "This component doesn't exist within the context tree"
      } else {

        return context
      }
}

export default useUserContext;