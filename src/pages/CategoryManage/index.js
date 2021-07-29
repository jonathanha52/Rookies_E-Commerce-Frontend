import React from 'react';
import { Table, Button, Modal, ModalBody }  from 'reactstrap';
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
        this.deleteCategory = this.deleteCategory.bind(this);
        this.fetchAllCategory = this.fetchAllCategory.bind(this);
    }
    componentDidMount(){
        this.fetchAllCategory();
    }
    fetchAllCategory() {
        SpringHelper.get("category/public")
            .then((response) => {
                this.setState({ categoryList: response.data });
            });
    }

    deleteCategory(e){
        SpringHelper.delete("category/admin/"+e.target.id)
        .then(response => {
            if(response.status === 200){
                var temp =[...this.state.categoryList]
                for(let i = 0; i < this.state.categoryList.length; i++){
                    if(this.state.categoryList[i].id == e.target.id){
                        temp.splice(i, 1);
                        this.setState({categoryList: temp});
                        break;
                    }
                        
                }
            }
        })
        .catch(exception =>{
            console.log(exception);
        })

        
    }
    editCategory(e){
        for(let i = 0; i < this.state.categoryList.length; i++){
            if(this.state.categoryList[i].id == e.target.id){
                this.setState({updatingCategory: this.state.categoryList[i]});
                break;
            }
        }
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
            <Modal isOpen={this.state.formModal} toggle={(e) => this.toggleFormModal(e, "submit")}>
                <ModalBody>
                    <CategoryInfoForm onSuccess={this.fetchAllCategory}></CategoryInfoForm>
                </ModalBody>
            </Modal>
            <center className="m-3"><h5>CATEGORY MANAGE</h5></center>
            <Button onClick={(e) => this.toggleFormModal(e, "submit")}>Add category</Button>
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
                        <td><Button id={entry.id} color="danger" onClick={this.deleteCategory}>Delete</Button></td>
                        <td><Button id={entry.id} color="warning" onClick={this.editCategory}>Edit</Button></td>
                    </tr>
                ))}
                </tbody>
                </Table>
        </CategoryContext.Provider>
        </>;
    }
}