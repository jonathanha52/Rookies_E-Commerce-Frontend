import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import './login.css'
export default class LoginForm extends React.Component{

    render(){
        return <center>
        <Form className="w-25">
            <FormGroup className="m-3">
                <Label className="m-1" for="username">Username</Label>
                <Input className="m-1" type="text" name="username" id="username" placeholder="Username"></Input>
            </FormGroup>
            <FormGroup className="m-3">
                <Label className="m-1" for="password">Password</Label>
                <Input className="m-1" type="password" name="password" id="password" placeholder="********"></Input>
            </FormGroup>
            <Button className="m-3">Submit</Button>
        </Form>
        </center>
    }
}