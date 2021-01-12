import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { RegisterContext } from "../contexts/Register";
import 'react-toastify/dist/ReactToastify.css';

export default function FormRegister() {
  const {
    isFilledUsername,
    isPassword,
    onChangeUsername,
    onChangePassword,
    onChangeFullname,
    handleRegister,
    user,
    notify
  } = useContext(RegisterContext);
  if (user) {
    return <Redirect to="/account" />;
  }
  return (
    <Form
      style={{
        paddingTop: 10
      }}
    >
      <h1>Register</h1>
      <FormGroup>
        <Label for="exampleUsername">Username</Label>
        <Input
          type="username"
          name="username"
          id="exampleUsername"
          placeholder="Username"
          onChange={onChangeUsername}
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="examplePassword"
          placeholder="Password"
          onChange={onChangePassword}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFullname">Fullname</Label>
        <Input
          type="name"
          name="fullname"
          id="exampleFullname"
          placeholder="Fullname"
          onChange={onChangeFullname}
        />
      </FormGroup>      
      <div>
        <Button 
          color="primary" 
          disabled={!(isFilledUsername && isPassword)}
          onClick={(e) => {
            handleRegister(e, notify)
          }}
        >
          Register
        </Button>
      </div>
    </Form>
  );
}
