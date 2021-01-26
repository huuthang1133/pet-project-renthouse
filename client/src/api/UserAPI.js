import {useEffect, useState} from 'react'
import axios from 'axios'
import {link} from '../const'

export default function UserAPI(token){
    const [user, setUser] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        if(token){
            const getUser = async () => {
                const res = await axios.get(`${link}/users/infor`, {
                    headers: {Authorization: token}
                })
                res.data.isAdmin ? setIsAdmin(true) && setIsLogged(true) : setIsLogged(true)
            }
            getUser()
        }
    }, [token])

    return {
        user: [user, setUser],
        isAdmin: [isAdmin, setIsAdmin],
        isLogged: [isLogged, setIsLogged]
    }
}