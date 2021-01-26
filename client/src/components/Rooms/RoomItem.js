import React, {useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import axios from 'axios'
import {
    Col,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Button
  } from "reactstrap";
import { Link } from 'react-router-dom'

export default function RoomItem({room}){
    const state = useContext(GlobalState)
    const [token] = state.token
    const [callback, setCallback] = state.callback

    const hireRoom = async (e) => {
        try {
            e.preventDefault()
            alert('Bạn đã quyết định thuê phòng này ?')
            const res = await axios.post(`/transactions`, { id: room._id},{
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch(err){
            alert(err.response.data.msg)
        }
    }
    return (
        <Col sm="4" key={room._id}>
            <Card style={{ marginTop: 10 }}>
                <CardImg
                    top
                    width="100%"
                    src={room.image}
                    alt="Card image cap"
                />
                <CardBody>
                    <CardTitle>{room.name.toUpperCase()}</CardTitle>
                    <CardTitle>GIÁ: {Intl.NumberFormat().format(room.price)}</CardTitle>
                    {room.isVacancy ? <CardText>Tình Trạng : Trống</CardText> : <CardText>Tình Trạng : Không</CardText>}
                    <>
                        <Button
                            onClick={hireRoom}
                            color="primary"
                            style={{marginRight: 10}}
                            disabled={!room.isVacancy}                           
                        >
                            Thuê
                        </Button>
                        <Button color="primary">
                            <Link to={`/detailroom/${room._id}`} style={{color: 'white'}}>Xem Chi Tiết</Link>
                        </Button>
                    </>            

                </CardBody>
            </Card>
        </Col>      
    )
}