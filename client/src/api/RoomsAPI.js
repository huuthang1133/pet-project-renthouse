import {useState, useEffect} from 'react';
import axios from 'axios'

export default function RoomsAPI(callback){
    const [rooms, setRooms] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)    
    const [isVacancy, setIsVacancy] = useState('')

    useEffect(() => {
        try {
            const getRooms = async () => {
                const res = await axios.get(`/rooms?limit=${page*9}&${isVacancy}&${sort}&name[regex]=${search}`)
                setRooms(res.data.rooms)
                setResult(res.data.result)
            }
            getRooms()          
        } catch(err){
            alert(err.response.data.msg)
        }
    }, [callback, sort, search, page, isVacancy])

    return {
        rooms: [rooms, setRooms],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],
        isVacancy: [isVacancy, setIsVacancy]
    }
}
