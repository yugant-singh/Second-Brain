import { createContext, useState } from "react";
import {getMe} from './services/auth.api.js'
export const AuthContext  = createContext()

export const AuthProvider = ({children})=>{
 const [user, setuser] = useState(null)
 const [loading, setLoading] = useState(true)

 useEffect(() => {
  const hydrateUser = async () => {
    try {
      const data = await getMe();
      setuser(data.user);
    } catch {
      setuser(null);
    } finally {
      setLoading(false);
    }
  };
  hydrateUser();
}, []);


 return <AuthContext.Provider value={{user,loading,setLoading,setuser}}>
{children}
 </AuthContext.Provider>

}

