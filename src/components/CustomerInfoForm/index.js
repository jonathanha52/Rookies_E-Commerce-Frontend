import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default class CustomerInfoForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            validUsername: null,
            validEmail: null,
            validPassword: null
        }
        this.validateInput = this.validateInput.bind(this);
    }
    validateInput(e){
        //Get user = e.target.value
    }
    signup(e){
        alert("Signed up");
    }

    edit(e){
        alert("Edited");
    }

    render(){
        //TODO: Implement render function
        return <>
        <center>
            <Form onSubmit={this.props.edit? this.edit : this.signup} className="w-25">
                <FormGroup className="m-3">
                    <Label className="m-1" for="username">Username</Label>
                    <Input className="m-1" type="text" name="username" id="username" placeholder="Username" onChange={this.validateInput}></Input>
                </FormGroup>
                <FormGroup className="m-3">
                    <Label className="m-1" for="first-name">First name</Label>
                    <Input className="m-1" type="text" name="first-name" id="first-name" placeholder="First Name"></Input>
                </FormGroup>
                <FormGroup className="m-3">
                    <Label className="m-1" for="last-name">Last name</Label>
                    <Input className="m-1" type="text" name="last-name" id="last-name" placeholder="Last Name"></Input>
                </FormGroup>
                <FormGroup className="m-3">
                    <Label className="m-1" for="email">Email</Label>
                    <Input className="m-1" type="email" name="email" id="email" placeholder="example@email.com"></Input>
                </FormGroup>
                {this.props.edit ? <>
                <FormGroup className="m-3">
                    <Label className="m-1" for="password">Password</Label>
                    <Input className="m-1" type="password" name="password" id="password" placeholder="********"></Input>
                </FormGroup>
                 <FormGroup className="m-3">
                    <Label className="m-1" for="password2">Retype password</Label>
                    <Input className="m-1" type="password" name="password2" id="password2" placeholder="********"></Input>
                </FormGroup> </>: <></>}
                <Button className="m-3">Submit</Button>
            </Form>
        </center>
        </>
    }
} 