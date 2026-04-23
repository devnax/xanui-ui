import { createContext, useContext } from "react";

const AuthContext = createContext<any>(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children, value }: any) => {
   return (
      <AuthContext.Provider value={value}>
         {children}
      </AuthContext.Provider>
   )
}

export const AuthForm = () => {
   const auth = useAuth()

   return (
      <div>form</div>
   )
}