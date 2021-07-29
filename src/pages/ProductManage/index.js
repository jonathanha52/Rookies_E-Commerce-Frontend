import React from 'react';
import { Table, Button, Modal, ModalBody, UncontrolledCollapse }  from 'reactstrap';
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
            updatingProduct: null,
            successModal: false,
            failedModal: false
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
        this.deleteProduct = this.deleteProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.toggleSuccesModal = this.toggleSuccesModal.bind(this);
        this.toggleFailedModal = this.toggleFailedModal.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.fetchAllProduct = this.fetchAllProduct.bind(this);
    }
    componentDidMount(){
        this.fetchAllProduct();
    }
    fetchAllProduct() {
        SpringHelper.get("products/public")
            .then(response => {
                if (response.status === 200) {
                    this.setState({ productList: response.data });
                }
                else {
                    this.setState({ productList: [this.placeholderProduct] });
                }
            })
            .catch(exception => {
                alert("Error when making request" + exception);
                this.setState({ productList: [this.placeholderProduct] });
            });
    }

    toggleSuccesModal(){
        this.setState({successModal: !this.state.successModal});
    }
    toggleFailedModal(){
        this.setState({failedModal: !this.state.failedModal});
    }
    deleteProduct(e){
        var temp = [...this.state.productList];
        SpringHelper.delete("products/admin/id="+ e.target.id)
        .then(response => {
            if(response.status === 200)
                for(let i = 0; this.state.productList.length; i++){
                    if(this.state.productList[i].id == e.target.id){
                        temp.splice(i, 1);
                        this.setState({productList: temp});
                        break;
                    }
                }
        })
        .catch(exception => {
            console.log(exception);
        })
    }
    addProduct(){
        this.setState({updatingProduct: null});
        this.toggleFormModal();
    }
    editProduct(e){
        for(let i = 0; i < this.state.productList.length; i++){
            if(this.state.productList[i].id == e.target.id)
                this.setState({updatingProduct: this.state.productList[i]})
        }
        this.toggleFormModal();
    }
    toggleFormModal(){
        this.setState({formModal: !this.state.formModal});
    }
    sortById(a,b){
        return a.id - b.id;
    }
    render(){
        return <>
        <center className="m-3">PRODUCT MANAGE</center>
        <ProductContext.Provider value={this.state.updatingProduct}>
            <Modal isOpen={this.state.successModal} toggle={this.toggleSuccesModal}>
                <ModalBody>
                <h1 className="text-success">Delete product success</h1>
                </ModalBody>
            </Modal>
            <Modal isOpen={this.state.failedModal} toggle={this.toggleFailedModal}>
                <ModalBody>
                <h1  className="text-danger">Delete product failed</h1>
                </ModalBody>
            </Modal>
            <Modal isOpen={this.state.formModal} toggle={this.toggleFormModal}>
                <ModalBody>
                        <ProductInfoForm onSuccess={this.fetchAllProduct}/>
                </ModalBody>  
            </Modal>
            <Button color="primary" onClick={this.addProduct}>Add product</Button>
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
                        this.state.productList.sort(this.sortById).map(entry => (
                            <>
                            <tr id={entry.id} key={entry.id}>
                                <th scope="row" key={entry.id}>{entry.id}</th>
                                <td>{entry.productName}</td>
                                <td>{entry.productDescription}</td>
                                <td>{entry.category.name}</td>
                                <td>{entry.price}</td>
                                <td>{entry.unit}</td>
                                <td>
                                    <a href={entry.imgUrl} target="_blank" rel="noreferrer" alt="Deleted or wrong url">{entry.imgUrl}</a>
                                    <Button id={"toggler-"+entry.id}>Preview</Button>
                                    <UncontrolledCollapse toggler={"#toggler-"+entry.id}>
                                        <img src={entry.imgUrl}></img>
                                    </UncontrolledCollapse>
                                </td>
                                <td>{entry.createdDate}</td>
                                <td>{entry.updatedDate}</td>
                                <td><Button id={entry.id} color="danger" onClick={this.deleteProduct}>Delete</Button></td>
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