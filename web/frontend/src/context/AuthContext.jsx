import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('access_token') ? jwt_decode(localStorage.getItem('access_token')) : null)
    const [loading, setLoading] = useState(localStorage.getItem('access_token') ? true: false)

    const loginUser = async (formData) => {
        try{
            const res = await  axios.post(`${import.meta.env.VITE_AUTH_URL}/token/`, {
                ...formData
            })

            if(res.status === 200) {
                setAuthToken(res.data)
                const user = {
                  id: res.data.id,
                  username: res.data.username,
                  is_staff: res.data.is_staff,
                  is_superuser: res.data.is_superuser,
                  tenant: res.data.tenant,
                }
                
                setUser(user)
                localStorage.setItem('access_token', JSON.stringify(res.data))
            }
            
        }catch(e) {
            console.log(e)
        }finally{
            navigate('/')
        }
    }
    const logoutUser = useCallback(() => {
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem('access_token');
        navigate('/login');
      }, [setUser, setAuthToken, navigate]);
    

    const updateToken = useCallback(async () => {
        try {
          const res = await axios.post(`${import.meta.env.VITE_AUTH_URL}/token/refresh/`, {
            refresh: authToken?.refresh
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (res.status === 200) {
            console.log('res-data --> ' ,res.data)
            setAuthToken(res.data);
            localStorage.setItem('access_token', JSON.stringify(res.data));
          } else {
            logoutUser();
          }
          setLoading(false);
        } catch (e) {
          logoutUser();
          console.log(e);
        }
      }, [authToken, logoutUser]);

      useEffect(() => {
        const fifteenMinutes = 1000 * 60 * 5;
        let interval = null;
    
        if (loading) {
          console.log('loading', loading);
          updateToken();
          interval = setInterval(updateToken, fifteenMinutes);
        } else if (authToken) {
          interval = setInterval(updateToken, fifteenMinutes);
        }
    
        return () => clearInterval(interval);
      }, [authToken, loading, updateToken]);

    let contextData = {
        user: user,
        authToken: authToken,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

 return (
    <AuthContext.Provider value={contextData}>
        {loading ? null : children}
    </AuthContext.Provider>
 )
}

export default AuthContext;