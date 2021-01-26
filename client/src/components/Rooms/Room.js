import React, { useContext } from "react";
import {GlobalState} from '../../GlobalState'
import { Container, Row } from "reactstrap";
import RoomItem from './RoomItem'
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../ultils/Loading'
import Filter from './Filter'
import LoadMore from './LoadMore'

export default function Room({ history }) {
  const state = useContext(GlobalState)
  const [rooms] = state.roomsAPI.rooms
  
  if(!rooms) return <Loading />
  return (
    <Container style={{ marginTop: 15 }}>
      <h1 style={{ textAlign: "center" }}>DANH SÁCH PHÒNG TRỌ</h1>
      <Filter />
      <Row>
        {rooms.map((room) => (<RoomItem room={room} key={room._id} />))}
      </Row>
      <LoadMore />
      {rooms.length === 0 && <Loading />}     
    </Container>
  );
}
