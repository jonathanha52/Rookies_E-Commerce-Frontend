import React from 'react';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { withRouter } from 'react-router';
import SpringHelper from '../../api/spring_api';
import { Link } from 'react-router-dom';
class CustomerInfoForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            usernameNotBlank: null,
            usernameHasNoSpace: null,
            validEmail: null,
            validPassword: null,
            validRetypePassword: null,
            user: {},
            currentPassword: "",
        }
        this.validateInput = this.validateInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.passwordRef = React.createRef();
    }
    componentDidMount(){
        if(this.props.edit){
            let id = this.props.match.params.id;
            this.fetchUserInfo(id);
        }
    }
    fetchUserInfo(id) {
        SpringHelper.get("users/public/" + id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ user: response.data });
                }
            })
            .catch(exception => {
                console.log(exception);
            });
    }

    validateInput(e){
        if(e.target.id === "username"){
            if(e.target.value.trim().length === 0){
                this.setState({usernameNotBlank: false})
            }else
                this.setState({usernameNotBlank: true})
            if(e.target.value.trim().includes(" "))
                this.setState({usernameHasNoSpace: false})
            else
                this.setState({usernameHasNoSpace: true})
        }else if(e.target.id === "email"){
            if(e.target.value.trim().length === 0){
                this.setState({validEmail: false})
            }else{
                this.setState({validEmail: true})
            }
        }else if(e.target.id === "password"){
            this.setState({currentPassword: e.target.value.trim()});
            if(e.target.value.trim().length < 6){
                this.setState({validPassword: false})
            }else{
                this.setState({validPassword: true})
            }
        }else if(e.target.id === "password2"){
            if(e.target.value.trim() != this.state.currentPassword){
                this.setState({validRetypePassword: false});
            }else{
                this.setState({validRetypePassword: true});
            }
        }
    }
    onSubmit(e){
        e.preventDefault();
        if(this.props.edit){
            if(this.state.usernameNotBlank && this.state.validEmail && this.state.usernameHasNoSpace){
                let data = {
                username: e.target.username.value,
                firstName: e.target.firstName.value,
                lastLame: e.target.lastName.value,
                email: e.target.email.value,
                }
                let id = this.props.match.params.id;
                SpringHelper.put("users/public/"+id, data)
                .then(response => {
                    if(response.status === 200)
                        this.fetchUserInfo(id);
                        alert("Edit successful!")
                })
                .catch(exception => {
                    console.log(exception)
                })
            }
        }else{
            let data = {
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value,
                role: "customer",
                firstname: e.target.firstName.value,
                lastname: e.target.lastName.value
            }
            if(this.state.validEmail && this.state.validPassword && this.state.validRetypePassword && this.state.usernameNotBlank && this.state.validEmail){
                SpringHelper.post("auth/signup", data)
                .then(response => {
                    if(response.status === 200){
                        alert("Signup successful!");
                    }
                })
                .catch(exception => {
                    console.log(exception);
                })
            }
        }
        
    }


    render(){
        //TODO: Implement render function
        return <>
        {!this.props.edit ? <Link className="back"to="/">Go back to main page</Link> : <></>}
        <center>
            <Form onSubmit={this.onSubmit} className="w-25">
                <FormGroup className="m-3">
                    <Label className="m-1" for="username">Username</Label>
                    <Input valid={(this.state.usernameNotBlank != null && this.state.usernameNotBlank)
                        && this.state.usernameHasNoSpace != null && this.state.usernameHasNoSpace}
                    invalid={(this.state.usernameNotBlank != null && !this.state.usernameNotBlank)
                        && this.state.usernameHasNoSpace != null && !this.state.usernameHasNoSpace}
                    className="m-1" type="text" name="username" id="username" placeholder="Username" 
                    onChange={this.validateInput}
                    defaultValue={this.state.user.username}></Input>
                    {!this.state.usernameNotBlank ? <FormFeedback invalid>Username must not be blank</FormFeedback> : <></>}
                    {!this.state.usernameHasNoSpace ? <FormFeedback invalid>Username must not have space between character</FormFeedback> : <></>}
                </FormGroup>
                <FormGroup className="m-3">
                    <Label className="m-1" for="firstName">First name</Label>
                    <Input className="m-1" type="text" name="firstName" id="firstName" placeholder="First Name" 
                    defaultValue={this.state.user.firstName}></Input>
                </FormGroup>
                <FormGroup className="m-3">
                    <Label className="m-1" for="lastName">Last name</Label>
                    <Input className="m-1" type="text" name="lastName" id="lastName" placeholder="Last Name" 
                    defaultValue={this.state.user.lastName}></Input>
                </FormGroup>
                { this.state.user.username === window.localStorage.getItem("username") ?
                <FormGroup className="m-3">
                    <Label className="m-1" for="email">Email</Label>
                    <Input valid={this.state.email != null && this.state.validEmail}
                    invalid={this.state.email != null && !this.state.validEmail}  
                    className="m-1" type="email" name="email" id="email" placeholder="example@email.com" 
                    defaultValue={this.state.user.email}
                    onChange={this.validateInput}></Input>
                    {!this.state.validEmail ? <FormFeedback invalid>Email must not be blank</FormFeedback> : <></>}
                </FormGroup>
                : <></>    
                }
                {!this.props.edit ? <>
                <FormGroup className="m-3">
                    <Label className="m-1" for="password">Password</Label>
                    <Input valid={this.state.validPassword != null && this.state.validPassword}
                    invalid={this.state.validPassword != null && !this.state.validPassword}
                    className="m-1" type="password" name="password" id="password" placeholder="********" 
                    onChange={this.validateInput}
                    ref={this.passwordRef}></Input>
                    {!this.state.validPassword ? <FormFeedback invalid>Password must have at least 6 character</FormFeedback> : <></>}
                </FormGroup>
                 <FormGroup className="m-3">
                    <Label className="m-1" for="password2">Retype password</Label>
                    <Input valid={this.state.validRetypePassword != null && this.state.validRetypePassword}
                    invalid={this.state.validRetypePassword != null && !this.state.validRetypePassword}
                    className="m-1" type="password" name="password2" id="password2" placeholder="********" 
                    onChange={this.validateInput}></Input>
                    {!this.state.validRetypePassword ? <FormFeedback invalid>Password does not match</FormFeedback> : <></>}
                </FormGroup> </>: <></>}
                <Button disabled={this.state.user.username != window.localStorage.getItem("username")}
                className="m-3">{this.props.edit? "Edit" : "Submit"}</Button>
            </Form>
        </center>
        </>
    }
} 
export default withRouter(CustomerInfoForm);