import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { LoginContext } from "../contexts/LogIn";
import 'react-toastify/dist/ReactToastify.css';

export default function FormLogin() {
  const {
    isFilledUsername,
    isPassword,
    onChangeUsername,
    onChangePassword,
    handleLogin,
    user,
    notify
  } = useContext(LoginContext);
  if (user) {
    if (user.isAdmin) {
      return <Redirect to="/admin" />;
    }
    return <Redirect to="/account" />;
  }
  return (
    <Form
      style={{
        paddingTop: 10
      }}
    >
      <h1>Log In</h1>
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
      <div>
        <Button 
          color="primary" 
          disabled={!(isFilledUsername && isPassword)}
          onClick={(e) => {
            handleLogin(e, notify)
          }}
        >
          Log In
        </Button>
      </div>
      <div
        style={{
          marginTop: 10
        }}
      >
        Don't have an account ?<Link to="/register"> Register</Link>
      </div>
    </Form>
  );
}
