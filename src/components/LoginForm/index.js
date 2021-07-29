import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup,FormFeedback, Label, Input } from 'reactstrap';
import './login.css'
import SpringHelper from '../../api/spring_api';
import './login.css'

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            usernameIsValid: null,
            emailIsValid: null,
            invalidCred: false
        }
        this.validateEmptyField = this.validateEmptyField.bind(this);
        this.login = this.login.bind(this);
    }
    login(e){
        e.preventDefault();
        if(this.state.emailIsValid && this.state.usernameIsValid){
            var credential = {
                username: e.target.username.value.trim(),
                password: e.target.password.value.trim()
            }
            SpringHelper.post("auth/signin", credential)
            .then(async response => {
                if(response.status === 200){
                    window.localStorage.setItem("userId", response.data.id);
                    window.localStorage.setItem("accessToken", response.data.accessToken);
                    window.localStorage.setItem("username", response.data.username);
                    window.localStorage.setItem("role", response.data.roles[0])
                    await this.props.history.push("/");
                } else {
                    this.setState({invalidCred: true});
                }
            })
            .catch(exception => {
                this.setState({invalidCred: true});
                console.log(exception);
            })
        }
    }
    validateEmptyField(e){
        if(e.target.value.trim().length === 0){
            if(e.target.id === "username")
                this.setState({usernameIsValid: false})
            else
                this.setState({emailIsValid: false})
        }else{
            if(e.target.id === "username")
                this.setState({usernameIsValid: true})
            else
                this.setState({emailIsValid: true})
        }
    }
    render(){
        return <>
        <Link className="back"to="/">Go back to main page</Link>
        <center>
        <Form className="w-25" onSubmit={this.login}>
            <FormGroup className="m-3">
                <Label className="m-1" for="username">Username</Label>
                <Input valid={this.state.usernameIsValid != null && this.state.usernameIsValid} 
                    invalid={this.state.usernameIsValid != null && !this.state.usernameIsValid} 
                    className="m-1" type="text" name="username" id="username" placeholder="Username" 
                    onChange={this.validateEmptyField}></Input>
                {!this.state.usernameIsValid ? <FormFeedback invalid>Username must not be blank</FormFeedback> : <></>}
            </FormGroup>
            <FormGroup className="m-3">
                <Label className="m-1" for="password">Password</Label>
                <Input valid={this.state.emailIsValid != null && this.state.emailIsValid} 
                    invalid={this.state.emailIsValid != null && !this.state.emailIsValid} 
                    className="m-1" type="password" name="password" id="password" placeholder="********" 
                    onChange={this.validateEmptyField}></Input>
                {!this.state.emailIsValid ? <FormFeedback invalid>Password must not be blank</FormFeedback> : <></>}
            </FormGroup>
            <FormGroup>
                {this.state.invalidCred ? <Label className="text-danger">Wrong username or password</Label> : <></>}
                <Label>Don't have an account? <Link to="/signup">Sign up</Link></Label>
            </FormGroup>
            <Button className="m-3">Submit</Button>
        </Form>
        </center>
        </>
    }
}
export default withRouter(LoginForm);
