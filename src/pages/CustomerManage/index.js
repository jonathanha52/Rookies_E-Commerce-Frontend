import React from 'react';
import { Table, Button }  from 'reactstrap';
import { Link } from 'react-router-dom';
import SpringHelper from '../../api/spring_api';

export default class CustomerManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            customerList:[]
        }
    }
    componentDidMount(){
        SpringHelper.get("users")
        .then((response) => {
            this.setState({customerList: response.data})
        })
    }
    render(){
        return <>
            <Table bordered small hover className="mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {this.state.customerList.map(entry => (
                    <tr key={entry.userID}>
                        <th scope="row">{entry.userID}</th>
                        <td>{entry.username}</td>
                        <td>{entry.firstName}</td>
                        <td>{entry.lastName}</td>
                        <td>{entry.email}</td>
                        <td>{entry.role.roleName}</td>
                        <td><Button color="danger">Delete</Button></td>
                        <td><Link to="/mark" className="btn btn-primary">Edit</Link></td>
                    </tr>
                ))}
                </tbody>
                </Table>
        </>;
    }
}