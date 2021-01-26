import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import { Button } from 'reactstrap'
import './detailRoom.css'
import axios from 'axios'

export default function DetailRoom(){
    const params = useParams()
    const state = useContext(GlobalState)
    const [rooms] = state.roomsAPI.rooms
    const [detailRoom, setDetailRoom] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.callback

    const hireRoom = async () => {
        try {
            const res = await axios.post(`/transactions`, { id: detailRoom._id}, {
                headers: {Authorization: token }
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch(err){
            alert(err.response.data.msg)
        }
    }

    useEffect(() => {
        if(params.id){
            if(rooms.length){
                const matchRoom = rooms.find(room => room._id === params.id)
                if(matchRoom){
                    setDetailRoom(matchRoom)
                }
            }
        }
    }, [params])

    return (
        <div className="detail">
            <img src={detailRoom.image} alt="" />
            <div className="box-detail">
                <div className="row">
                    <h2>{detailRoom.name}</h2>
                </div>
                <span>GIÁ THUÊ: {Intl.NumberFormat().format(detailRoom.price)} VNĐ</span>
                <p>{detailRoom.description}</p>
                <p>DIỆN TÍCH: {detailRoom.square} m2</p>
                {
                    detailRoom.isVacancy ? 
                    <Button onClick={hireRoom} color="primary">THUÊ</Button>
                    : <h3>PHÒNG ĐÃ ĐƯỢC CHO THUÊ</h3>
                }
            </div>
        </div>      
    )
}