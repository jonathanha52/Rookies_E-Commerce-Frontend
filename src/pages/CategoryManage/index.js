import React from 'react';
import { Table, Button, Modal, ModalBody }  from 'reactstrap';
import { Link } from 'react-router-dom';
import SpringHelper from '../../api/spring_api';
import { CategoryContext } from '../../context/CategoryContext';
import CategoryInfoForm from '../../components/CategoryInfoForm';
export default class CategoryManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryList:[],
            updatingCategory: null,
            formModal: false
        }
        this.toggleFormModal = this.toggleFormModal.bind(this);
        this.editCategory = this.editCategory.bind(this);
    }
    componentDidMount(){
        SpringHelper.get("category/public")
        .then((response) => {
            this.setState({categoryList: response.data})
        })
    }
    editCategory(e){
        this.setState({updatingCategory: this.state.categoryList[e.target.id-1]});
        this.toggleFormModal();
    }
    toggleFormModal(e, type="edit"){
        if(type == "submit")
            this.setState({updatingCategory: null})
        this.setState({formModal: !this.state.formModal});
    }
    render(){
        return <>
        <CategoryContext.Provider value={this.state.updatingCategory}>
            <Modal isOpen={(e) => this.toggleFormModal(e, "submit")} toggle={this.toggleFormModal}>
                <ModalBody>
                    <CategoryInfoForm></CategoryInfoForm>
                </ModalBody>
            </Modal>
            <center className="m-3"><h5>CATEGORY MANAGE</h5></center>
            <Button onClick={this.toggleFormModal}>Add product</Button>
            <Table bordered small hover className="mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {this.state.categoryList.map(entry => (
                    <tr key={entry.id}>
                        <th scope="row">{entry.id}</th>
                        <td>{entry.name}</td>
                        <td>{entry.description}</td>
                        <td><Button color="danger">Delete</Button></td>
                        <td><Button id={entry.id}color="warning" onClick={this.editCategory}>Edit</Button></td>
                    </tr>
                ))}
                </tbody>
                </Table>
        </CategoryContext.Provider>
        </>;
    }
}