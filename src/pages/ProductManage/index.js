import React from 'react';
import { Table, Button, Modal, ModalBody, ModalFooter }  from 'reactstrap';
import ProductInfoForm from '../../components/ProductInfoForm';
import SpringHelper from '../../api/spring_api';
import './productManage.css';
import { ProductContext } from '../../context/ProductContext';
export default class ProductManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            productList:[],
            formModal: false,
            confirmModal: false,
            updatingProduct: null,
        }
        this.placeholderProduct = {
            id: 1,
            productName: "test product",
            productDescription: "lorem ipsum",
            category:{name: "test"},
            price: 0,
            unit: "bo",
            imgUrl: "http://via.placeholder.com/300x300",
            createdDate: "2021-07-25",
            updatedDate: "2021-07-25"
        }
        this.toggleFormModal = this.toggleFormModal.bind(this);
        this.toggleConfirmModal = this.toggleConfirmModal.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
    }
    componentDidMount(){
        SpringHelper.get("products/public")
        .then(response => {
            if(response.status === 200){
                this.setState({productList: response.data})
            }
            else{
                this.setState({productList: [this.placeholderProduct]})
            }
        })
        .catch(exception => {
            alert("Error when making request" + exception);
            this.setState({productList: [this.placeholderProduct]})
        })
    }
    editProduct(e){
        console.log(e.target.id);
        this.setState({updatingProduct: this.state.productList[e.target.id-1]})
        this.toggleFormModal();
    }
    toggleFormModal(){
        this.setState({formModal: !this.state.formModal});
    }
    toggleConfirmModal(){
        this.setState({confirmModal: !this.state.confirmModal});
    }
    deleteProduct(){
        alert("Deleted");
        this.toggleConfirmModal();
        //TODO: Implement
    }
    render(){
        return <>
        <center className="m-3">PRODUCT MANAGE</center>
        <ProductContext.Provider value={this.state.updatingProduct}>
            <Modal isOpen={this.state.formModal} toggle={this.toggleFormModal}>
                <ModalBody>
                        <ProductInfoForm />
                </ModalBody>  
            </Modal>
            <Modal className="top-margin" isOpen={this.state.confirmModal} toggle={this.toggleConfirmModal}>
                <ModalBody>
                    <h2 className="text-danger">Are you sure?</h2>
                    <h3 className="text-danger">This cannot be undone</h3>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.deleteProduct}>Confirm</Button>
                </ModalFooter>
            </Modal>
            <Modal className="left-margin" isOpen={this.state.previewModal} toggle={this.togglePreviewModal} backdrop={false} keyboard={false}>
                <ModalBody>
                    <img src={this.state.previewingImage} alt="Preview"></img>
                </ModalBody>
            </Modal>
            <Button color="primary">Add product</Button>
            <Table bordered size="sm" hover className="mt-4">
                <thead key="header">
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Unit</th>
                    <th>Img URL</th>
                    <th>Created date</th>
                    <th>Updated date</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody key="body">
                    {
                        this.state.productList.map(entry => (
                            <>
                            <tr id={entry.id} key={entry.id}>
                                <th scope="row" key={entry.id}>{entry.id}</th>
                                <td>{entry.productName}</td>
                                <td>{entry.productDescription}</td>
                                <td>{entry.category.name}</td>
                                <td>{entry.price}</td>
                                <td>{entry.unit}</td>
                                <td><a href={entry.imgUrl} target="_blank" rel="noreferrer" alt="Deleted or wrong url">{entry.imgUrl}</a></td>
                                <td>{entry.createdDate}</td>
                                <td>{entry.updatedDate}</td>
                                <td><Button id={entry.id} color="danger" onClick={this.toggleConfirmModal}>Delete</Button></td>
                                <td><Button id={entry.id} color="warning" onClick={this.editProduct}>Edit</Button></td>
                            </tr>
                            </>
                        ))
                    }
                </tbody>
                </Table>
        </ProductContext.Provider>
        </>;
    }
}