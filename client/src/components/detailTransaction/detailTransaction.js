import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import {Table, Row, Col} from 'reactstrap'
import Container from 'reactstrap/lib/Container';
import BillList from './BillList'
import './detailTransaction.css'


export default function DetailTransaction() {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [isAdmin] = state.userAPI.isAdmin
    const [callback, setCallback] = useState(false)
    const [bills, setBills] = useState([])
    let { id } = useParams()

    useEffect(()=>{
        if(id){
            const getBills = async () => {
                if(isAdmin) {
                    const res = await axios.get(`/bills/${id}`, {
                        headers:{Authorization: token}
                    })
                    setBills(res.data)
                } else {
                    const res = await axios.get(`/bills/${id}`, {
                        headers:{Authorization: token}
                    })
                    setBills(res.data)
                }   
            }
            getBills()
        }
    },[id, callback])


    if(!bills.length) return <h2>BẠN CHƯA CÓ HÓA ĐƠN ĐẾN KỲ THANH TOÁN</h2>

    return (
        <Container style={{paddingTop: 50}}>
            <h2>DANH SÁCH CÁC HÓA ĐƠN CỦA BẠN</h2>
            <Table bordered>
                <>
                    {
                        isAdmin ? 
                        <tr>
                            <th>KỲ THANH TOÁN</th>
                            <th>TIỀN PHÒNG</th>
                            <th>TIỀN ĐIỆN</th>
                            <th>TIỀN NƯỚC</th>
                            <th>TỔNG CỘNG</th>
                            <th>Ý KIẾN</th>
                            <th>TÌNH TRẠNG</th>
                            <th>XÁC NHẬN</th>
                            <th>ĐIỀU CHỈNH</th>
                        </tr>                         
                        : 
                        <tr>
                            <th>KỲ THANH TOÁN</th>
                            <th>TIỀN PHÒNG</th>
                            <th>TIỀN ĐIỆN</th>
                            <th>TIỀN NƯỚC</th>
                            <th>TỔNG CỘNG</th>
                            <th>Ý KIẾN</th>
                            <th>THANH TOÁN</th>
                        </tr>                        
                    }             
                </>

                <tbody>
                    {bills.map(bill => (
                        <BillList bill={bill} key={bill._id} callback={callback} setCallback={setCallback} token={token}/>
                    ))}
                </tbody>           
            </Table>
        </Container>
    )
}