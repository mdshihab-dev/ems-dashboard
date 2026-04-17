import api from "@/api/axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,setUser] = useState(null)
  const [token,setToken] = useState(null)
  const [loading,setLoading] = useState(true)

  const refreshSession = async ()=>{
     const token = localStorage.getItem("token")
      if(!token){
          setUser(null)
          setToken(null)
          setLoading(false)
          return
      }   
      try {
        const {data} = await api.get('/auth/session')
        setUser(data.user)
      } 
      catch (error) {
        localStorage.removeItem('token')
        setUser(null)
        setToken(null)
        setLoading(false)
      }
      finally{
        setLoading(false)
      }
  }

  // if there is a token in local storage then we will get the user data
  useEffect(()=>{
    refreshSession()
  },[])

  // login api calling here 
  const login = async ({email,password,role})=>{
      const {data} = await api.post('/auth/login', {email,password,role})
      localStorage.setItem('token', data.token)
      setUser(data.user)
      setToken(data.token)
      return data.user
  }

  const logout = async ()=>{
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
  }


  const value = {user,token,loading,login, logout};
  return <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
