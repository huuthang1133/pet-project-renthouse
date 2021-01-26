import React, {useState, useEffect} from 'react'
import RoomsAPI from './api/RoomsAPI'
import UserAPI from './api/UserAPI'
import axios from 'axios'


export const GlobalState = React.createContext()
export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)
    const [callback, setCallback] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [supports, setSupports] = useState([])

    useEffect(()=> {
        const rf_token = localStorage.getItem('rf_token')
        if(rf_token) {
            const refreshToken  = async () => {
                const res = await axios.post(`/users/refresh_token`, {rf_token})
                setToken(res.data.accesstoken)
                setTimeout(() => {
                    refreshToken()
                }, 9*60*1000)                
            }
            refreshToken()
        }
    }, [callback])


    const state = {
        token: [token, setToken],
        userAPI: UserAPI(token),
        roomsAPI: RoomsAPI(callback),
        callback: [callback, setCallback],
        transactions: [transactions, setTransactions],
        supports: [supports, setSupports]
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
