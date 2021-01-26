import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import {GlobalState} from '../../GlobalState'
import TransactionList from '../TransactionList'
import axios from 'axios'
import './compAccount'

export default function CompAccount(){

    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [transactions, setTransactions] = state.transactions
    const [callback, setCallback] = state.callback

    useEffect(()=>{
        if(token){
            const getTransactions = async () => {
                if(isAdmin){
                    const res = await axios.get(`/transactions`, {
                        headers: {Authorization: token}
                    })
                    setTransactions(res.data)
                } else if(isLogged) {
                    const res = await axios.get(`transactions/user`, {
                        headers: {Authorization: token}
                    })
                    setTransactions(res.data)
                }
            }
            getTransactions()
        }
    }, [token, callback])

    return (
        <div>
            {isAdmin ? <h2>DANH SÁCH CÁC PHÒNG ĐANG CHO THUÊ</h2>: <h2>DANH SÁCH CÁC PHÒNG BẠN ĐANG THUÊ</h2>}
            <Table bordered>
                <tr>
                    <th>PHÒNG TRỌ</th>
                    <th>NGƯỜI THUÊ</th>
                    <th>NGÀY THUÊ</th>
                    <th>HÓA ĐƠN</th>
                    {isAdmin ? <th>TRẠNG THÁI</th> : ""}
                    <th>YÊU CẦU</th>
                    {isAdmin ? "" : <th>GỬI HỖ TRỢ</th>}
                    {isAdmin ? <th>TẠO HÓA ĐƠN</th> : ""}
                </tr>
                <tbody>
                    {transactions.map(item => (
                        <TransactionList 
                            process={process}
                            transaction={item} 
                            key={item._id} 
                            bills={item?.bills}
                        />
                    ))}
                </tbody>            
            </Table>            
        </div>
    );
}