import Axios from 'axios'
import React, {useContext, useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Form } from 'reactstrap'
import axios from 'axios'
import {GlobalState} from '../../GlobalState'

export default function BillList({bill, callback, setCallback, token}){
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin

    const [modal, setModal] = useState(false);
    const [modalBill, setModalBill] = useState(false);
    const [comment, setComment] = useState('')
    const [price, setPrice] = useState({
        'electric': bill.price.electric,
        'water': bill.price.water,
        'room': bill.price.room
    })

    const toggle = () => setModal(!modal);    
    const toggleBill = () => setModalBill(!modalBill); 

    const handlePayment = async () => {
        alert('Bạn chắc chắn đã thanh toán hóa đơn này?')
        await axios.get(`/bills/payment/${bill._id}`, {
            headers: {Authorization: token}
        })
        setCallback(!callback)
    }

    const handleComment = (e) => {
        setComment(e.target.value)
    }

    const submitComment = async (func) => {
        await axios.patch(`/bills/comment/${bill._id}`, {comment}, {
            headers: {
                Authorization: token
            }
        })
        setCallback(!callback)
        func()
    }

    const confirmBill = async () => {
        alert("Bạn đã nhận được khoản thanh toán cho hóa đơn này?")
        await axios.get(`/bills/confirm/${bill._id}`, {
            headers: {Authorization: token}
        })
        setCallback(!callback)
    }

    const updateBill = async (e, func) => {
        e.preventDefault()
        await axios.patch(`/bills/${bill._id}`, price, {
            headers: {Authorization: token}
        })
        func()
        setCallback(!callback)
    }

    const handleChangeInput = (e) => {
        const {name, value} = e.target
        setPrice({
          ...price,
          [name]: value
        })
      }

    return (
        <tr>
            <td>{bill.bill_date}</td>
            <td>{Intl.NumberFormat().format(bill.price.room)}</td>
            <td>{Intl.NumberFormat().format(bill.price.electric)}</td>
            <td>{Intl.NumberFormat().format(bill.price.water)}</td>
            <td>{Intl.NumberFormat().format(bill.price.room+bill.price.electric+bill.price.water)}</td>
            <td>
                {
                    bill.comment.content ? <span>{bill.comment.content}  {bill.comment.isUpdate ? " - Đã chỉnh sửa" : ""}</span> :
                    <>
                        {isAdmin ? bill.comment.content :
                        <>
                            <Button onClick={toggle}>GỬI Ý KIẾN</Button> 
                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>GỬI Ý KIẾN VỀ HÓA ĐƠN</ModalHeader>
                                <ModalBody>
                                    <Input name="content" onChange={handleComment}/>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={()=> submitComment(toggle)}>GỬI</Button>{' '}
                                    <Button color="secondary" onClick={toggle}>ĐÓNG</Button>
                                </ModalFooter>
                            </Modal>
                        </>
                        }       
                    </>
                }
            </td>
            <td>
                {
                    bill.isComplete ? "Đã Thanh Toán" : 
                        bill.isProcessing ? "... Chờ xác nhận" :
                        <>
                            {isAdmin ? <span style={{marginRight: 10}}>Chưa Thanh Toán</span>: 
                            <Button onClick={handlePayment} color='primary'>Thanh Toán</Button>
                            }
                            
                        </>
                }
            </td>
            {isAdmin ? <td>{bill.isComplete ? "Đã nhận" : bill.isProcessing ? <Button onClick={confirmBill}>Xác Nhận</Button> : ""}</td>: ""}
            {isAdmin ? <td><Button onClick={toggleBill}>ĐIỀU CHỈNH</Button></td> : ""}
            <Modal isOpen={modalBill} fade={false} toggle={toggleBill}>
                <ModalHeader toggle={toggleBill}>HOÁ ĐƠN</ModalHeader>
                <ModalBody>
                <Form
                    style={{
                    paddingTop: 10
                    }}
                >
                    <FormGroup>
                    <Label for="exampleUsername">TIỀN ĐIỆN</Label>
                    <Input
                        type="number"
                        name="electric"
                        id="exampleUsername"
                        value={price.electric}
                        placeholder="Tien dien"
                        onChange={handleChangeInput}
                        required
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label for="exampleWater">TIỀN NƯỚC</Label>
                    <Input
                        type="number"
                        name="water"
                        id="exampleUsername"
                        value={price.water}
                        placeholder="Tien nuoc"
                        onChange={handleChangeInput}
                        required
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label for="exampleRoom">TIỀN PHÒNG</Label>
                    <Input
                        type="number"
                        name="room"
                        id="exampleUsername"
                        value={price.room}
                        placeholder="Tien phong"
                        onChange={handleChangeInput}
                        required
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label for="exampleRoom">KỲ THANH TOÁN</Label>
                    <Input
                        type="String"
                        id="exampleUsername"
                        placeholder="Ky Thanh Toan"
                        value={bill.bill_date}
                        disabled={true}
                        required
                    />
                    </FormGroup>                      
                </Form>            
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e) => updateBill(e, toggleBill)}>GỬI</Button>{' '}
                    <Button color="secondary" onClick={toggleBill}>ĐÓNG</Button>
                </ModalFooter>
            </Modal>               
        </tr>
    );

}