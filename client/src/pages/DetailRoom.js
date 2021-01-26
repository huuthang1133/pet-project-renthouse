import React from "react";
import { Container, Row } from "reactstrap";
import DetailRoom from '../components/detailRoom/DetailRoom'

const DetailRoomPage = () => {
  return (
    <Container>
      <Row>
        <DetailRoom />
      </Row>
    </Container>
  );
};

export default DetailRoomPage;