import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "reactstrap";
import { link } from '../const/const'

import TransactionList from "./TransactionList";

export default function CompAccount({ history }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    if(user){
        axios
        .get(`${link}/transactions/${user.userId}`)
        .then((res) => {
          setTransactions(res.data);
      });
    }
  }, [transactions], [user]);
  return (
    <Container>
      <div>
        <h2>Hi {user.fullName}</h2>
        <h2>DANH SÁCH PHÒNG TRỌ MÀ BẠN ĐANG THUÊ</h2>
      </div>
      <TransactionList transactions={transactions} />
    </Container>
  );
}
