import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { LoginContext } from "../contexts/LogIn";

export default function FormLogin() {
  const {
    isFilledUsername,
    isPassword,
    onChange1,
    onChange2,
    handleLogin,
    user
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
      onSubmit={handleLogin}
    >
      <h1>Log In</h1>
      <FormGroup>
        <Label for="exampleUsername">Username</Label>
        <Input
          type="username"
          name="username"
          id="exampleUsername"
          placeholder="Username"
          onChange={onChange1}
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="examplePassword"
          placeholder="Password"
          onChange={onChange2}
        />
      </FormGroup>
      <Button color="primary" disabled={!(isFilledUsername && isPassword)}>
        Log In
      </Button>
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
