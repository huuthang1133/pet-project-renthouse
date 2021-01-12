import React from "react";
import { Row } from "reactstrap";

import TransactionListItem from "./TransactionListItem";

const TransactionList = ({ transactions }) => {
  return (
    <Row>
      {transactions.map((item) => {
        return <TransactionListItem transaction={item} key={item._id}/>;
      })}
    </Row>
  );
};

export default TransactionList;
