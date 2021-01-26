import React, {useContext, useEffect, useState} from "react";
import {GlobalState} from '../GlobalState'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter,   Form,
  FormGroup,
  Input,
  Label } from 'reactstrap'

import { Link, useHistory } from 'react-router-dom'
import axios from "axios";
import {link} from '../const'

const TransactionList = ({ transaction }) => {
  const state = useContext(GlobalState)
  const history = useHistory()
  const [token] = state.token
  const [setSupports] = state.supports
  const [support, setSupport] = useState('')
  const [totalBill, setTotalBill] = useState(0)
  const [totalConfirmBill, setTotalConfirmBill] = useState(0)
  const [isAdmin] = state.userAPI.isAdmin
  const [callback, setCallback] = state.callback
  const [price, setPrice] = useState({
  })
  
  const [bill_date, setBillDate] = useState('')

  const [modal, setModal] = useState(false);
  const [modalSupport, setModalSupport] = useState(false)

  const toggle = () => setModal(!modal);
  const toggleSupport = () => setModalSupport(!modalSupport)

  useEffect(()=> {
    const getSupports = async () => {
      if(isAdmin){
        const res = await axios.get(`${link}/supports`, {
          headers: {Authorization: token}
        })
        setSupports(res.data)
      } else {
        const res = await axios.get(`${link}/supports/user/${transaction._id}`, {
          headers: {Authorization: token}
        })
        setSupports(res.data)
      }
    }
    getSupports()
  }, [callback, isAdmin, setSupports, token, transaction._id])

  useEffect(() => {
    const billComplete = transaction.bills.filter(bill => bill.bill.isComplete === false)
    if(billComplete.length){
      setTotalBill(billComplete.length)
      const billConfirm = billComplete.filter(bill => bill.bill.isProcessing === true)
      if(billConfirm) {
        setTotalConfirmBill(billConfirm.length)
      }
    }
  }, [callback, transaction.bills])  

  const handleSupport = (e) => {
    setSupport(e.target.value)
  }

  const submitSupport = async (e, func) => {
    e.preventDefault()
    try {
      await axios.post(`${link}/supports/${transaction._id}`, {content: support}, {
        headers: {Authorization: token}
      })
    }
    catch (err) {
      alert(err.response.data.msg)
    }
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

  const handeBillDate = (e) => {
    setBillDate(e.target.value)
  }

  const createBill = async (e, func) => {
    e.preventDefault()
    try {
      await axios.post(`${link}/bills`, {price, bill_date, transactionId: transaction._id}, {
        headers: {Authorization: token}
      })
      setCallback(!callback)
      history.push(`/account/transaction/${transaction._id}`)
      func()
    }
    catch(err){
      alert(err.response.data.msg)
    }
  }

  return (
    <>
        <tr>
          <td>{transaction.room.name.toUpperCase()}</td>
          <td style={{textTransform: "capitalize"}}>{transaction.user.fullName}</td>
          <td>{transaction.rent_date}</td>
          <td><Link to={`/account/transaction/${transaction._id}`}>Xem</Link></td>
          {
            isAdmin ? 
              <td>{totalBill} Hóa đơn chưa thanh toán 
                {totalConfirmBill ? ` - Trong đó ${totalConfirmBill} hóa đơn chờ xác nhận` : ""}
              
              </td> 
              : ""
          }
          <td><Link to={`/account/support/${transaction._id}`}>Xem</Link></td>
          {
            isAdmin ? "" :
              <td>
                <Button onClick={toggleSupport}>GỬI HỖ TRỢ</Button>
                <Modal isOpen={modalSupport} toggle={toggleSupport}>
                  <ModalHeader toggle={toggleSupport}>GỬI HỖ TRỢ</ModalHeader>
                  <ModalBody>
                      <Input name="content" onChange={handleSupport}/>
                  </ModalBody>
                  <ModalFooter>
                      <Button color="primary" onClick={(e)=> submitSupport(e, toggleSupport)}>GỬI</Button>{' '}
                      <Button color="secondary" onClick={toggleSupport}>ĐÓNG</Button>
                  </ModalFooter>
                </Modal>                
              </td> 
          }
          {isAdmin ? <td><Button onClick={toggle}>GỬI HÓA ĐƠN</Button></td> : ""}
        </tr>
        <Modal isOpen={modal} fade={false} toggle={toggle}>
          <ModalHeader toggle={toggle}>HOÁ ĐƠN</ModalHeader>
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
                onChange={handeBillDate}
                required
              />
            </FormGroup>                      
          </Form>            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => createBill(e, toggle)}>GỬI</Button>{' '}
            <Button color="secondary" onClick={toggle}>ĐÓNG</Button>
          </ModalFooter>
        </Modal>        
    </>
  );
};

export default TransactionList;
