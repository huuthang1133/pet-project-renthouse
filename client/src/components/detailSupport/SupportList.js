import React, {useEffect, useState, useContext} from 'react'
import {Button} from 'reactstrap'
import {GlobalState} from '../../GlobalState'
import {useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import {link} from '../../const'


export default function SupportList({support}){
    const state = useContext(GlobalState)
    const [token] = state.token
    const [transactions] = state.transactions
    const [isAdmin] = state.userAPI.isAdmin
    const [callback,setCallback] = state.callback
    const [transaction, setTransaction] = useState([])
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        if(id) {
            const matchTran = transactions.find(transaction => transaction._id === id)
            if(matchTran._id === support.transaction) setTransaction([matchTran])
        }
    }, [id, callback, support.transaction, transactions])

    const updateSupport = async () => {
        try {
            alert('Bạn đã xử lý xong yêu cầu này?')
            await axios.patch(`${link}/supports/${support._id}`, {
                headers: {Authorization: token}
            })
            history.push('/account')
        }
        catch(err) {
            alert(err.response.data.msg)
        }
        setCallback(!callback)
    }

    if(!transaction.length) return null
    return(
        <tr>
            <td style={{textTransform:'capitalize'}}>{transaction[0].room.name}</td>
            <td style={{textTransform:'capitalize'}}>{transaction[0].user.fullName}</td>
            <td>{support.content}</td>
            <td>{support.isComplete ? 'Đã xử lý' : 'Chưa xử lý'}</td>
            {isAdmin ? <td><Button onClick={updateSupport} disabled={support?.isComplete}>Xử lý</Button></td> : ""}
        </tr>
    )
}