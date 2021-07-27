import React from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalBody } from 'reactstrap';
import SpringHelper from '../../api/spring_api';
import ImgurHelper from '../../api/img_api';
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
        console.log(e.target.productImg.value);

        ImgurHelper.post(e.target.productImg.value)
        .then(response => {
            console.log(response)
        }).catch(exception => {
            console.log(exception);
        });
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
            <h1 className="text-success"> Added product</h1>
            </ModalBody>
        </Modal>
        <Modal isOpen={this.state.failedModal} toggle={this.toggleFailedModal}>
            <ModalBody>
            <h1  className="text-danger"> Added failed</h1>
            </ModalBody>
        </Modal>
    <center>
        <Form onSubmit={this.onSubmit}>
            <FormGroup className="m-3">
                <Label className="m-1" for="product-name">Product name</Label>
                <Input defaultValue={this.context? this.context.productName : ""} className="m-1" type="text" name="username" id="product-name" placeholder="Product name"></Input>
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
                <Label className="m-1" for="categories">Category</Label>
                <Input defaultValue={this.context? this.context.category.name : ""} className="m-1" type="select" name="categories" id="categories">
                    {
                        this.state.categories.map(entry => (
                            <option defaultValue={entry.name}>{entry.name}</option>
                        ))
                    }s
                </Input>
            </FormGroup>
            <FormGroup className="m-3">
                <Label className="m-1" for="productImg">Image</Label>
                <Input className="m-1" type="text" name="productImg" id="productImg"></Input>
            </FormGroup>
            <Button className="m-3">Submit</Button>
        </Form>
    </center>
    </>
    }
}
ProductInfoForm.contextType = ProductContext;