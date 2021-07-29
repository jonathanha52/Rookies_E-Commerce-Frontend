import React from 'react';
import { Modal, ModalBody, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { CategoryContext } from '../../context/CategoryContext';
import SpringHelper from '../../api/spring_api';

export default class CategoryInfoForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            successModal: false,
            failedModal: false,
            isValidName: null
        }
        this.toggleSuccesModal = this.toggleSuccesModal.bind(this);
        this.toggleFailedModal = this.toggleFailedModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateName = this.validateName.bind(this);
    }
    toggleSuccesModal(){
        this.setState({successModal: !this.state.successModal});
    }
    toggleFailedModal(){
        this.setState({failedModal: !this.state.failedModal});
    }
    validateName(e){
        if(e.target.value.trim().length === 0){
            this.setState({isValidName: false});
        }
        else{
            this.setState({isValidName: true});
        }
    }
    onSubmit(e){
        e.preventDefault();
        var data = {
            name: e.target.name.value.trim(),
            description: e.target.description.value.trim()
        }
        if(this.context){
            SpringHelper.put("category/admin/"+this.context.id, data)
            .then(response => {
                if(response.status  === 200){
                    this.props.onSuccess();
                    this.toggleSuccesModal();
                }
                else{
                    this.toggleFailedModal();
                }
            })
            .catch(exception => {
                this.toggleFailedModal();
                console.log(exception);
            })
        }else{
            SpringHelper.post("category/admin/", data, true)
            .then(response => {
                if(response.status === 200){
                    this.props.onSuccess();
                    this.toggleSuccesModal();
                }
                else{
                    this.toggleFailedModal();
                }
            })
            .catch(exception => {
                this.toggleFailedModal();
                console.log(exception);
            })
        }
    }
    render(){
        return <>
            <Modal isOpen={this.state.successModal} toggle={this.toggleSuccesModal}>
                <ModalBody>
                <h1 className="text-success"> Added category successful!</h1>
                </ModalBody>
            </Modal>
            <Modal isOpen={this.state.failedModal} toggle={this.toggleFailedModal}>
                <ModalBody>
                <h1  className="text-danger"> Added category failed!</h1>
                </ModalBody>
            </Modal>
            <center>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup className="m-3">
                        <Label className="m-1" for="name">Name</Label>
                        <Input valid={this.state.isValidName != null && this.state.isValidName}
                            invalid={this.state.isValidName != null && !this.state.isValidName}
                            defaultValue={this.context? this.context.name : ""} className="m-1" type="text" name="name" id="name" placeholder="Product name"
                            onChange={this.validateName}></Input>
                        {this.state.isValidName != null && !this.state.isValidName ? 
                        <FormFeedback invalid>Name must not be blank!</FormFeedback> :
                        <></>}
                    </FormGroup>
                    <FormGroup className="m-3">
                        <Label className="m-1" for="description">Description</Label>
                        <Input defaultValue={this.context? this.context.description : ""} className="m-1" type="textarea" name="description" id="description" placeholder="Description"></Input>
                    </FormGroup>
                    <FormGroup>

                    </FormGroup>
                    <Button className="m-3">Submit</Button>
                </Form>
            </center>
        </>
    }
}
CategoryInfoForm.contextType=CategoryContext;