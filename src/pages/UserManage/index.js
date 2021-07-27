import React from 'react';
import { Table, Button,Modal, ModalHeader, ModalBody, ModalFooter }  from 'reactstrap';
import SpringHelper from '../../api/spring_api';

export default class UserManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userList:[],
            confirmModal: false
        }
        this.toggleConfirmModal = this.toggleConfirmModal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    componentDidMount(){
        SpringHelper.get("users")
        .then((response) => {
            this.setState({userList: response.data})
        })
    }
    deleteUser(e){
        this.toggleConfirmModal();
    }
    toggleConfirmModal(){
        this.setState({confirmModal: !this.state.confirmModal});
    }
    render(){
        return <>
        <Modal>
            <ModalHeader>
                <h5>Are you sure</h5>
            </ModalHeader>
            <ModalBody>
                <p className="text-danger">This action cannot be undone</p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger">Confirm</Button>
                <Button color="success">Return</Button>
            </ModalFooter>
        </Modal>
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
                        ?<td><Button color="danger" onClick={this.deleteUser}>Delete</Button></td>
                        :<></>}
                    </tr>
                ))}
                </tbody>
                </Table>
        </>;
    }
}