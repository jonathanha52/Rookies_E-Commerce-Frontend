import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
    ButtonDropdown,
    DropdownMenu,
  } from 'reactstrap';
import { UserContext } from '../../context/UserContext';
import './navbar.css'

export default class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            dropDownOpened: false,
            user:{}
        };
        this.toggle = this.toggle.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
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
    render(){
        //TODO: Dropdown list items are placeholder, replace with categories
        return <>
           <Navbar color="light" light expand="md" id="nav">
                <NavbarBrand href="/">E-Commerce</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                          <NavLink href="/About">About</NavLink>
                        </NavItem>
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
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        {/* <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Categories
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <NavLink href="/products">Categories 1</NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink href="/products">Categories 2</NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown> */}
                    </Nav>
                    <InputGroup className="w-50">
                        <Input placeholder="Search"></Input>
                        <InputGroupAddon addonType="append">
                            <Button color="success">Search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Collapse>
                {this.context?
                    
                <ButtonDropdown isOpen={this.state.dropDownOpened} toggle={this.toggleDropDown}>
                    <DropdownToggle>{this.context.username}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Edit profile</DropdownItem>
                        <DropdownItem divider></DropdownItem>
                        <DropdownItem className="text-danger">Logout</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
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
NavBar.contextType=UserContext;