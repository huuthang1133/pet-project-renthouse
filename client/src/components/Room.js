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

export default function Room({ history }) {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios.get(`${link}/rooms`).then((res) => {
      setRooms(res.data);
    });
  });

  const hireRoom = (room) => {
    axios
      .post(`${link}/transactions`, {
        username: JSON.parse(localStorage.getItem("user")).username,
        room
      })
    history.push("/account");
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
