import React, { useState } from "react";

import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Button,
  Input
} from "reactstrap";

import axios from "axios";

const TransactionListItem = ({ transaction }) => {
  const [comment, setComment] = useState("");
  const [support, setSupport] = useState("");
  const [transactions, setTransactions] = useState(transaction);

  const onChange1 = (e) => {
    setSupport(e.target.value);
  };
  const onChange2 = (e) => {
    setComment(e.target.value);
  };
  const getSupport = async (e, transaction) => {
    if (support) {
      const res = axios.post("https://pet-project-renthouse.herokuapp.com/supports", {
        content: support,
        transactionId: transaction._id
      });
      setTransactions(res.data);
      setSupport("");
    }
  };
  const getComment = async (e, transaction, bill) => {
    if (comment) {
      const res = axios.patch(
        `https://pet-project-renthouse.herokuapp.com/transactions/updatebill/${transaction._id}`,
        {
          content: comment,
          billId: bill._id
        }
      );
      setTransactions(res.data);
      setComment("");
    }
  };
  return (
    <Col sm="6" key={transaction._id}>
      <Card style={{ marginTop: 10 }}>
        <CardImg
          top
          width="100%"
          src="http://dummyimage.com/300x200.jpg/ff4444/ffffff"
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{transaction.room.name}</CardTitle>
          {transaction.bills.map((bill) => (
            <>
              {!bill.isComplete ? (
                <CardBody>
                  <CardTitle>{bill.bill_date}</CardTitle>
                  <CardTitle>TIEN DIEN: {bill.price.electric}</CardTitle>
                  <CardTitle>TIEN NUOC: {bill.price.water}</CardTitle>
                  <CardTitle>GIA: {bill.price.room}</CardTitle>
                  <CardTitle>
                    <Form
                      style={{
                        paddingTop: 10
                      }}
                    >
                      <FormGroup>
                        <Input
                          style={{ marginBottom: 10 }}
                          type="username"
                          name="comment"
                          id="exampleUsername"
                          placeholder="Comment"
                          onChange={onChange2}
                          value={comment}
                        />
                        <Button
                          color="primary"
                          disabled={!comment.length}
                          onClick={(e) => {
                            getComment(e, transaction, bill);
                          }}
                        >
                          Comment
                        </Button>
                      </FormGroup>
                    </Form>
                  </CardTitle>
                </CardBody>
              ) : (
                ""
              )}
            </>
          ))}
          <Form
            style={{
              paddingTop: 10
            }}
          >
            <FormGroup>
              <Input
                style={{ marginBottom: 10 }}
                type="username"
                name="support"
                id="exampleUsername"
                placeholder="Support"
                onChange={onChange1}
                value={support}
              />
              <Button
                color="primary"
                disabled={!support.length}
                onClick={(e) => {
                  getSupport(e, transaction);
                }}
              >
                Support
              </Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TransactionListItem;
