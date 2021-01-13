import React from "react";
import { Container, Row } from "reactstrap";
import { CompAccount } from "../components";

const Account = ({ history }) => {
  return (
    <Container>
      <Row>
          <CompAccount history={history} />
      </Row>
    </Container>
  );
};

export default Account;
