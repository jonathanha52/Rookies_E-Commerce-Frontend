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
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Form,
    Input,
    Button,
    FormGroup,
    InputGroup,
    InputGroupAddon
  } from 'reactstrap';
import './navbar.css'
export default class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            setIsOpen: false,
            isLoggedIn: false,
            categories: [],
            user:{}
        };
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount(){
        //TODO: Get all category from API
    }
    toggle(){
        this.setState({
            setIsOpen: !this.state.isOpen
        });
    }
    render(){
        //TODO: Dropdown list items are placeholder, replace with categories
        let status;
        if(this.state.isLoggedIn)
            status = <NavbarText>Hello, {this.state.username}</NavbarText>
        else{
            status = <>
                <NavLink href="/signin">Login</NavLink>
                <NavLink href="/signup">Sign up</NavLink>
            </>
        }
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
                                <NavLink href="/customers">Manage customes</NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink href="/products">Manage product</NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
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
                        </UncontrolledDropdown>
                    </Nav>
                    <InputGroup className="w-50">
                        <Input placeholder="Search"></Input>
                        <InputGroupAddon addonType="append">
                            <Button color="success">Search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Collapse>
                {status}
            </Navbar>
        </>;
    }
}