import React from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalBody } from 'reactstrap';
import SpringHelper from '../../api/spring_api';
import { ProductContext } from '../../context/ProductContext';
export default class ProductInfoForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            successModal: false,
            failedModal: false
        }
        this.toggleSuccesModal = this.toggleSuccesModal.bind(this);
        this.toggleFailedModal = this.toggleFailedModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        SpringHelper.get("category/public")
        .then(response => {
            this.setState({categories: response.data})
        })
    }

    onSubmit(e){
        e.preventDefault();
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        var today = yyyy + '-' + mm + '-' + dd
        let data = {
            name: e.target.productName.value,
            category: e.target.categories.value,
            unit: e.target.unit.value,
            createdBy: window.localStorage.getItem("userId"),
            description: e.target.description.value,
            imgUrl: e.target.productImg.value.trim() === 0 ? "http://via.placeholder.com/300x300" :  e.target.productImg.value,
            price: e.target.price.value,
            createdDate: this.context ? this.context.createdDate : today,
            updatedDate: today
        }
        if(this.context){
            let id = this.context.id;
            SpringHelper.put("products/admin/id="+ id, data)
            .then(response => {
                if(response.status === 200)
                    this.props.onSuccess();
                    this.toggleSuccesModal();
            })
            .catch(exception => {
                console.log(exception);
                this.toggleFailedModal();
            })
        }else{
            SpringHelper.post("products/admin", data, true)
            .then(response => {
                if(response.status === 200){
                    this.props.onSuccess();
                    this.toggleSuccesModal();
                }
                    
            })
            .catch(exception => {
                console.log(exception);
                this.toggleFailedModal();
            })
        }
    }
    toggleSuccesModal(){
        this.setState({successModal: !this.state.successModal});
    }
    toggleFailedModal(){
        this.setState({failedModal: !this.state.failedModal});
    }
    render(){
        return <>
        <Modal isOpen={this.state.successModal} toggle={this.toggleSuccesModal}>
            <ModalBody>
            <h1 className="text-success">Success</h1>
            </ModalBody>
        </Modal>
        <Modal isOpen={this.state.failedModal} toggle={this.toggleFailedModal}>
            <ModalBody>
            <h1  className="text-danger">Failed</h1>
            </ModalBody>
        </Modal>
    <center>
        <Form onSubmit={this.onSubmit}>
            <FormGroup className="m-3">
                <Label className="m-1" for="productName">Product name</Label>
                <Input defaultValue={this.context? this.context.productName : ""} className="m-1" type="text" name="productName" id="productName" placeholder="Product name"></Input>
            </FormGroup>
            <FormGroup className="m-3">
                <Label className="m-1" for="description">Description</Label>
                <Input defaultValue={this.context? this.context.productDescription : ""} className="m-1" type="textarea" name="description" id="description" placeholder="Description"></Input>
            </FormGroup>
            <FormGroup className="m-3">
                <Label className="m-1" for="price">Price</Label>
                <Input defaultValue={this.context? this.context.price : 0} className="m-1" min="0"type="number" name="price" id="price"></Input>
            </FormGroup>
            <FormGroup className="m-3">
                <Label className="m-1" for="Unit">Unit</Label>
                <Input defaultValue={this.context? this.context.unit : ""} className="m-1" min="0"type="text" name="unit" id="unit"></Input>
            </FormGroup>
            <FormGroup className="m-3">
                <Label className="m-1" for="categories">Category</Label>
                <Input defaultValue={this.context? this.context.category.name : ""} className="m-1" type="select" name="categories" id="categories">
                    {
                        this.state.categories.map(entry => (
                            <option defaultValue={entry.name}>{entry.name}</option>
                        ))
                    }
                </Input>
            </FormGroup>
            <FormGroup className="m-3">
                <Label className="m-1" for="productImg">Image</Label>
                <Input defaultValue={this.context? this.context.imgUrl : ""}className="m-1" type="text" name="productImg" id="productImg"></Input>
            </FormGroup>
            <Button className="m-3">Submit</Button>
        </Form>
    </center>
    </>
    }
}
ProductInfoForm.contextType = ProductContext;