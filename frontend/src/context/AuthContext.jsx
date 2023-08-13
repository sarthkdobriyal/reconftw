import axios from "axios";
import { createContext, useEffect, useState } from "react";
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
            const res = await  axios.post(`${import.meta.env.VITE_API_URL}/token/`, {
                ...formData
            })


            if(res.status === 200) {
                setAuthToken(res.data)
                setUser(jwt_decode(res.data.access))
                localStorage.setItem('access_token', JSON.stringify(res.data))
            }
            
        }catch(e) {
            console.log(e)
        }finally{
            navigate('/')
        }
    }

    const logoutUser = () => {
        setUser(null)
        setAuthToken(null)
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    const updateToken = async () => {
        try{
            
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/token/refresh/`, {
            refresh: authToken?.refresh
        }, {
            'headers' : {
                'Content-Type': 'application/json'
            }
        })

        if(res.status === 200) {
            setAuthToken(res.data)
            localStorage.setItem('access_token', JSON.stringify(res.data))
        }else{
            logoutUser()
        }
        setLoading(false)
    }catch(e) {
        logoutUser()
        console.log(e)
    }
}

    useEffect(() => {

        if(loading){
            console.log('laoding', loading)
            updateToken()
        }

        const fifteenMinutes = 1000 * 60 * 5
        let intreval = setInterval(() => {
            if(authToken) {
                updateToken()
            }
        }, fifteenMinutes)
        return () => clearInterval(intreval)
    }, [authToken, loading])

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