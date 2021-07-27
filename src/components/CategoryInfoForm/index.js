import React from 'react';
import { Modal, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { CategoryContext } from '../../context/CategoryContext';
import SpringHelper from '../../api/spring_api';

export default class CategoryInfoForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            successModal: false,
            failedModal: false
        }
        this.toggleSuccesModal = this.toggleSuccesModal.bind(this);
        this.toggleFailedModal = this.toggleFailedModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    toggleSuccesModal(){
        this.setState({successModal: !this.state.successModal});
    }
    toggleFailedModal(){
        this.setState({failedModal: !this.state.failedModal});
    }
    onSubmit(e){
        var data = {
            name: e.target.name.value,
            description: e.target.description.value
        }
        if(this.context){
            SpringHelper.put("admin/category/"+this.context.id, data )
            .then(response => {
                console.log(response);
            })
            .catch(exception => {
                console.log(exception);
            })
        }else{
            SpringHelper.post("admin/category/", data )
            .then(response => {
                console.log(response);
            })
            .catch(exception => {
                console.log(exception);
            })
        }
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
                        <Label className="m-1" for="name">Name</Label>
                        <Input defaultValue={this.context? this.context.name : ""} className="m-1" type="text" name="name" id="name" placeholder="Product name"></Input>
                    </FormGroup>
                    <FormGroup className="m-3">
                        <Label className="m-1" for="description">Description</Label>
                        <Input defaultValue={this.context? this.context.description : ""} className="m-1" type="textarea" name="description" id="description" placeholder="Description"></Input>
                    </FormGroup>
                    <Button className="m-3">Submit</Button>
                </Form>
            </center>
        </>
    }
}
CategoryInfoForm.contextType=CategoryContext;