import React, { useState, useEffect } from "react";

import { link } from '../const/const'
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button
} from "reactstrap";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Room({ history }) {
  const notify = () => toast.success("Hire room Successfully !");
  const notify1 = (message) => toast.error(message);

  const [transaction, setTransaction] = useState([]);
  const [rooms, setRooms] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [token, setToken] = useState(localStorage.getItem("cool-jwt"))
  useEffect(() => {
    axios.get(`${link}/rooms`).then((res) => {
      setRooms(res.data);
    });
  }, [transaction]);

  const hireRoom = async (room) => {
    if(!user){
      notify1('Please login to hire room.')
      return history.push('/login')
    }
    if(user && !user.isAdmin){
      console.log(user.username, room)
      const res = await axios.post(`${link}/transactions`, {
          username: user.username,
          room
        }, { headers: {Authorization: token}})
      setTransaction(res.data)
      notify()
    }
    return null
  };
  return (
    <Container style={{ marginTop: 15 }}>
      <h1 style={{ textAlign: "center" }}>DANH SÁCH PHÒNG TRỌ</h1>
      <Row>
        {rooms.map((room) => (
          <Col sm="4" key={room._id}>
            <Card style={{ marginTop: 10 }}>
              <CardImg
                top
                width="100%"
                src="http://dummyimage.com/300x200.jpg/ff4444/ffffff"
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>{room.name}</CardTitle>
                {room.isVacancy && <CardText>Tình Trạng : Trống</CardText>}
                {!room.isVacancy && <CardText>Tình Trạng : Không</CardText>}
                {!room.isVacancy && (
                  <Button
                    disabled="false"
                    color="primary"
                    onClick={() => {
                      hireRoom(room);
                    }}
                  >
                    Thuê
                  </Button>
                )}
                {room.isVacancy && (
                  <Button
                    onClick={() => {
                      hireRoom(room);
                    }}
                    color="primary"
                  >
                    Thuê
                  </Button>
                )}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
