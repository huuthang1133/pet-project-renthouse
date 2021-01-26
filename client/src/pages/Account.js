import React from "react";
import { Container, Row } from "reactstrap";
import {CompAccount} from "../components";

const Account = ({ history }) => {
  return (
    <Container style={{marginTop: 25}}>
      <Row> 
        <CompAccount />   
      </Row>
    </Container>
  );
};

export default Account;
