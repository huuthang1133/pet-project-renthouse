import React from "react";
import { Container, Row } from "reactstrap";
import { AdminAccount } from "../components";

const Admin = ({ history }) => {
  return (
    <Container>
      <Row>
        <AdminAccount history={history} />
      </Row>
    </Container>
  );
};

export default Admin;
