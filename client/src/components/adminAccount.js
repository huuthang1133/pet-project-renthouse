import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Label
} from "reactstrap";

export default function AdminAccount({ history }) {
  const [user, setUser] = useState('')
  const [transaction, setTransaction] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [supports, setSupports] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [electric, setElectric] = useState("");
  const [water, setWater] = useState("");
  const [room, setRoom] = useState("");
  const [bill_date, setBillDate] = useState("");
  const [currentTransaction, setCurrentTransaction] = useState("");
  const [currentBill, setCurrentBill] = useState("");
  const [isComplete, setisComplete] = useState(false);
  const toggle = () => setModal(!modal);
  const toggle1 = () => setModal1(!modal1);

  useEffect(
    () => {
      axios
        .get("https://pet-project-renthouse.herokuapp.com/transactions")
        .then((res) => setTransactions(res.data));
      axios
        .get("https://pet-project-renthouse.herokuapp.com/supports")
        .then((res) => setSupports(res.data));
      setUser(JSON.parse(localStorage.getItem("user")))
    },
    [transaction],
    [supports],
    [user]
  );

  const onChange1 = (e) => {
    setElectric(e.target.value);
  };

  const onChange2 = (e) => {
    setWater(e.target.value);
  };

  const onChange3 = (e) => {
    setRoom(e.target.value);
  };

  const onChange4 = (e) => {
    setBillDate(e.target.value);
  };

  const onChange5 = (e) => {
    setisComplete(!isComplete);
  };

  const getTransaction = (transaction, toggle) => {
    toggle();
    setCurrentTransaction(transaction._id);
  };

  const getBill = (transaction, bill, toggle) => {
    toggle();
    setCurrentTransaction(transaction._id);
    setCurrentBill(bill._id);
  };
  const updateBill = async (e) => {
    e.preventDefault();
    if (electric.length || water.length) {
      const res = await axios.patch(
        `https://pet-project-renthouse.herokuapp.com/transactions/updatebill/${currentTransaction}`,
        {
          billId: currentBill,
          electric,
          water
        }
      );
      toggle1();
      setTransaction(res.data);
    }
    console.log(isComplete)
    if (isComplete) {
      const res = await axios.patch(
        `https://pet-project-renthouse.herokuapp.com/transactions/updatebill/${currentTransaction}`,
        {
          billId: currentBill
        }
      );
      toggle1();
      setTransaction(res.data);
    }
  };

  const postBills = async (e) => {
    e.preventDefault();
    let price = {
      electric,
      water,
      room
    };
    const res = await axios.patch(
      `https://pet-project-renthouse.herokuapp.com/transactions/${currentTransaction}`,
      {
        price,
        bill_date: bill_date
      }
    );
    setTransaction(res.data);
    toggle();
  };
  return (
    <Container>
      <div>
        <h2>Hi {user.fullName}</h2>
        <h2>DANH SÁCH PHÒNG TRỌ ĐANG CHO THUÊ</h2>
      </div>
      <Row>
        {transactions?.map((transaction) => (
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
                      <CardBody className="b">
                        <CardTitle>{bill.bill_date}</CardTitle>
                        <CardTitle>TIEN DIEN: {bill.price.electric}</CardTitle>
                        <CardTitle>TIEN NUOC: {bill.price.water}</CardTitle>
                        <CardTitle>GIA: {bill.price.room}</CardTitle>
                        <CardTitle>TRANG THAI: CHUA THANH TOAN</CardTitle>
                        <>
                          {bill.comment.map((comment) => (
                            <CardTitle>{comment.content}</CardTitle>
                          ))}
                        </>
                        <div>
                          <Button
                            color="danger"
                            onClick={(e) => {
                              getBill(transaction, bill, toggle1);
                            }}
                          >
                            Edit
                          </Button>
                          <Modal isOpen={modal1} toggle={toggle1}>
                            <ModalHeader toggle={toggle1}>
                              Modal title
                            </ModalHeader>
                            <ModalBody>
                              <Form
                                style={{
                                  paddingTop: 10
                                }}
                              >
                                <FormGroup>
                                  <Label for="exampleUsername">DIEN</Label>
                                  <Input
                                    type="number"
                                    name="electric"
                                    id="exampleUsername"
                                    placeholder="Tien dien"
                                    onChange={onChange1}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label for="exampleUsername">NUOC</Label>
                                  <Input
                                    type="number"
                                    name="water"
                                    id="exampleUsername"
                                    placeholder="Tien nuoc"
                                    onChange={onChange2}
                                  />
                                </FormGroup>
                                <Button
                                  color="primary"
                                  type="submit"
                                  disabled={!(electric.length || water.length)}
                                  onClick={(e, toggle1) => {
                                    updateBill(e);
                                  }}
                                >
                                  Submit
                                </Button>
                              </Form>
                              <Form
                                style={{
                                  paddingTop: 10
                                }}
                              >
                                <FormGroup check>
                                  <Label check>
                                    <Input
                                      type="checkbox"
                                      onChange={onChange5}
                                    />{" "}
                                    Đã Thanh Toán
                                  </Label>
                                </FormGroup>
                                <Button
                                  color="primary"
                                  type="submit"
                                  disabled={!isComplete}
                                  onClick={(e) => {
                                    updateBill(e);
                                  }}
                                >
                                  Submit
                                </Button>
                              </Form>
                            </ModalBody>
                          </Modal>
                        </div>
                      </CardBody>
                    ) : (
                      ""
                    )}
                  </>
                ))}
                <CardBody>
                  <CardTitle>
                    CẦN HỖ TRỢ
                    {supports.map((support) =>
                      support.transactionId === transaction._id ? (
                        <CardTitle>- {support.content}</CardTitle>
                      ) : (
                        ""
                      )
                    )}
                  </CardTitle>
                </CardBody>
                <Button
                  color="primary"
                  onClick={() => {
                    getTransaction(transaction, toggle);
                  }}
                >
                  Create Bills
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Create Bill</ModalHeader>
          <ModalBody>
            <Form
              style={{
                paddingTop: 10
              }}
            >
              <FormGroup>
                <Label for="exampleUsername">DIEN</Label>
                <Input
                  type="number"
                  name="electric"
                  id="exampleUsername"
                  placeholder="Tien dien"
                  onChange={onChange1}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">NUOC</Label>
                <Input
                  type="number"
                  name="water"
                  id="examplePassword"
                  placeholder="Tien nuoc"
                  onChange={onChange2}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">PHONG</Label>
                <Input
                  type="number"
                  name="room"
                  id="examplePassword"
                  placeholder="Tien Phong"
                  onChange={onChange3}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">NGAY THUE</Label>
                <Input
                  type="text"
                  name="bill_date"
                  id="examplePassword"
                  placeholder="Ngay Thue"
                  onChange={onChange4}
                />
              </FormGroup>
              <Button
                color="primary"
                type="submit"
                onClick={(e, toggle) => {
                  postBills(e);
                }}
              >
                Submit
              </Button>{" "}
              <Button color="secondary">Cancel</Button>
            </Form>
          </ModalBody>
        </Modal>
      </Row>
    </Container>
  );
}
