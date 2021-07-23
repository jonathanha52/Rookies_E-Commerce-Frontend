import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useParams } from 'react-router';
export default function EditProduct(props){
    let { id } = useParams();

    React.useEffect(() => {
        console.log(id);
        return () => {
        }
    }, [id])
        //TODO: Implement render function
    return <>
    <center>
        <Form className="w-25">
            <FormGroup className="m-3">
                <Label className="m-1" for="product-name">Product name { id }</Label>
                <Input className="m-1" type="text" name="username" id="product-name" placeholder="Product name"></Input>
            </FormGroup>
            <FormGroup className="m-3">
                <Label className="m-1" for="description">Description</Label>
                <Input className="m-1" type="textarea" name="description" id="description" placeholder="Description"></Input>
            </FormGroup>
            <FormGroup className="m-3">
                <Label className="m-1" for="price">Price</Label>
                <Input className="m-1" min="0"type="number" name="price" id="price"></Input>
            </FormGroup>
            <FormGroup className="m-3">
                <Label className="m-1" for="categories">Category</Label>
                <Input className="m-1" type="select" name="categories" id="categories">
                    <option>category 1</option>
                    <option>category 2</option>
                    <option>category 3</option>
                    <option>category 4</option>
                </Input>
            </FormGroup>
            <FormGroup className="m-3">
                <Label className="m-1" for="product-imd">Image</Label>
                <Input className="m-1" type="file" name="product-img" id="product-img"></Input>
            </FormGroup>
            <Button className="m-3">Submit</Button>
        </Form>
    </center>
    </>
    
}