import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';

export default function FormLogin() {
    const [user, setUser] = useState({
        username: "",
        password: "",
        fullName: ""
    }) 
    const history = useHistory()
    const notifyErr = (message) => toast.error(message)

    const handleChangeInput = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`/users/register`, {...user})
            localStorage.setItem('rf_token', res.data)
            window.location.href = '/'
        } catch(err){
            notifyErr(err.response.data.msg)
        }
    }

    return (
        <Form
            onSubmit={handleRegister}
            style={{
                paddingTop: 10
            }}
            type="submit"
        >
            <h1>Register</h1>
            <FormGroup>
                <Label for="exampleUsername">Username</Label>
                <Input
                type="username"
                name="username"
                id="exampleUsername"
                placeholder="Username"
                onChange={handleChangeInput}
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Password"
                onChange={handleChangeInput}
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleFullName">FullName</Label>
                <Input
                type="text"
                name="fullName"
                id="examplefullName"
                placeholder="FullName"
                onChange={handleChangeInput}
                />
            </FormGroup>            
            <div>
                <Button 
                color="primary"
                >
                Register
                </Button>
            </div>
        </Form>
  );
}