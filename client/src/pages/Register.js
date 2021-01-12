import React from "react";
import { FormRegister } from "../components";
import { Container, Row, Col } from "reactstrap";

const Register = () => {
  return (
    <Container>
      <Row>
        <Col sm="6">
          <FormRegister />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
