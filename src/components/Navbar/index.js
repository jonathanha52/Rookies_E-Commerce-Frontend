import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    Button,
    DropdownMenu,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from 'reactstrap';
import { withRouter } from 'react-router';
import SpringHelper from '../../api/spring_api';

import './navbar.css'

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            dropDownOpened: false,
            confirmModal: false,
            user:{},
            username:"",
            role: "CUSTOMER"
        };
        this.toggle = this.toggle.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.toggleConfirmModal = this.toggleConfirmModal.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount(){
        this.setState({
            username: window.localStorage.getItem("username") == null ? "" : window.localStorage.getItem("username"),
            role: window.localStorage.getItem("role") == null ? "CUSTOMER" : window.localStorage.getItem("role")
        })
    }
    
    toggle(){
        this.setState({
            setIsOpen: !this.state.isOpen
        });
    }
    toggleDropDown(){
        this.setState({
            dropDownOpened: !this.state.dropDownOpened
        })
    }
    toggleConfirmModal(){
        this.setState({confirmModal: !this.state.confirmModal})
    }
    confirmOperation(e){
        if(e.target.id === "yes")
            this.logout();
        else
            this.toggleConfirmModal();
    }
    logout(){
        SpringHelper.signout()
        .then(response => {
            console.log(response.status);
            if(response.status === 200){
                window.localStorage.removeItem("accessToken");
                window.localStorage.removeItem("userId");
                window.localStorage.removeItem("username");
                window.localStorage.removeItem("role");
                this.props.history.push("/");
            }
        })
        this.setState({
            username:"",
            role: "CUSTOMER"
        })
    }   
    render(){
        //TODO: Dropdown list items are placeholder, replace with categories
        return <>
            <Modal isOpen={this.state.confirmModal} toggle={this.toggleConfirmModal}>
                <ModalHeader toggle={this.toggleConfirmModal}></ModalHeader>
                <ModalBody><h5>Are you sure</h5></ModalBody>
                <ModalFooter>
                    <Button color="danger" id="yes" onClick={this.confirmOperation}>Yes</Button>
                    <Button color="no" id="no" onClick={this.confirmOperation}>No</Button>
                </ModalFooter>
            </Modal>
           <Navbar color="light" light expand="md" id="nav">
                <NavbarBrand href="/">E-Commerce</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {this.state.role === "ADMIN"?
                        <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Admin
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <NavLink href="/admin/customers">Manage customes</NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink href="/admin/products">Manage product</NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink href="/admin/categories">Manage category</NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        :
                        <>
                        </>}
                    </Nav>
                </Collapse>
                {this.state.username !== ""?
                    
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle>Hello, {this.state.username}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <NavLink href={"/customer/"+window.localStorage.getItem("userId")}>Edit profile</NavLink>
                        </DropdownItem>
                        <DropdownItem divider></DropdownItem>
                        <DropdownItem onClick={this.logout} className="text-danger">Logout</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                :
                    <>
                        <NavLink href="/signin">Login</NavLink>
                        <NavLink href="/signup">Sign up</NavLink>
                    </>
                }
            </Navbar>
        </>;
    }
}
export default withRouter(NavBar);