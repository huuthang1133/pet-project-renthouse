import React from "react";
import { Container, Row, Col } from "reactstrap";
import FormLogin from '../components/auth/FormLogin'

const LogIn = () => {
  return (
    <Container>
      <Row>
        <Col sm="6">
          <FormLogin />
        </Col>
      </Row>
    </Container>
  );
};

export default LogIn;
