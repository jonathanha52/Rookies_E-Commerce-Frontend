import React from 'react';
import { Table, Button,Modal, ModalHeader, ModalBody, ModalFooter }  from 'reactstrap';
import SpringHelper from '../../api/spring_api';

export default class UserManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userList:[],
            confirmModal: false,
            deletingId: -1
        }
        this.deleteUser = this.deleteUser.bind(this);
    }
    componentDidMount(){
        this.fetchAllUser();
    }
    fetchAllUser() {
        SpringHelper.get("users", true)
            .then((response) => {
                this.setState({ userList: response.data });
            });
    }

    deleteUser(e){
        SpringHelper.delete("users/admin/"+e.target.id)
        .then(response => {
            if(response.status === 200){
                this.fetchAllUser();
            }
        })
        .catch(exception => {
            console.log(exception);
        })
    }
    render(){
        return <>
        <center><h3>MANAGE USERS</h3></center>
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
                    </tr>
                </thead>
                <tbody>
                {this.state.userList.map(entry => (
                    <tr key={entry.userID}>
                        <th scope="row">{entry.userID}</th>
                        <td>{entry.username}</td>
                        <td>{entry.firstName}</td>
                        <td>{entry.lastName}</td>
                        <td>{entry.email}</td>
                        <td>{entry.role.roleName}</td>
                        
                        {!entry.username.includes("admin")
                        ?<td><Button id={entry.userID} color="danger" onClick={this.deleteUser}>Delete</Button></td>
                        :<></>}
                    </tr>
                ))}
                </tbody>
                </Table>
        </>;
    }
}