import React from "react";
import { FormLogin } from "../components";
import { Container, Row, Col } from "reactstrap";

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
