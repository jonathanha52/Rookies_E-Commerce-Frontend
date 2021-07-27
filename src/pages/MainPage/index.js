import React from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button
  } from 'reactstrap';
import Item from '../../components/Item';
import ItemCarousel from '../../components/ItemCarousel';
import SpringHelper from '../../api/spring_api';

export default class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            product: [],
            categories: []
        }
    }
    componentDidMount(){

        SpringHelper.get("products/public")
        .then(response => {
            if(response.status === 200){
                this.setState({product: response.data})
            }
            else{
                this.setState({product: [{
                    id: 0,
                    productName: "test product",
                    productDescription: "lorem ipsum",
                    category:{name: "test"},
                    price: 0,
                    unit: "bo",
                    imgUrl: "http://via.placeholder.com/300x300",
                    createdDate: "00-00-0000",
                    updatedDate: "00-00-0000"
                }]})
            }
        })
        .catch(exception => {
            alert("Error when making request" + exception);
        })

        SpringHelper.get("category/public")
        .then(response => {
            if(response.status === 200)
                this.setState({categories: [{id: 0, description: "", name:"All"}].concat(response.data)})
            else{
                this.setState({categories: [{id: 0, description: "", name:"All"}]})
            }
        })
        
    }
    applyFilter(e){
        e.preventDefault();
        console.log(e.target)
    }
    sortProduct(type){
        if(type === "price"){
            return 
        }
    }
    render(){
        return <Container>
            <Row>
                <center>
                    <ItemCarousel />
                </center>
            </Row>
            <Row className="mt-5">
                <Col xs="4">
                    <Form onSubmit={this.applyFilter}>
                        <FormGroup row className="mt-3 mb-3">
                            <Label for="sortType" sm={3}>Sort by:</Label>
                            <Col>
                                <Input type="select" name="sortType" id="sortType">
                                    <option value="none">None</option>
                                    <option value="price">Price</option>
                                    <option value="name">Name</option>
                                    <option value="rating">Rating</option>
                                    <option value="date">Added date</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row className="mt-3 mb-3">
                            <Label for="sortOrder" sm={3}>Order by:</Label>
                            <Col>
                                <Input type="select" name="sortOrder" id="sortOrder">
                                    <option value="descending">Descending</option>
                                    <option value="ascending">Ascending</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row className="mt-3 mb-3">
                            <Label for="categories" sm={3}>Order by:</Label>
                            <Col>
                                <Input type="select" name="categories" id="categories">
                                   {this.state.categories.map(entry => (
                                        <option value={entry.id}>{entry.name}</option>
                                   )) }
                                </Input>
                            </Col>
                        </FormGroup>
                        <Button color="primary">Filter</Button>
                    </Form>
                </Col>
                <Col>
                    <Row>
                        {
                            this.state.product.map(entry => (
                                <Col xs="3" key={entry.id}>
                                    <Item product={entry}/>
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </Container>;
    }
}