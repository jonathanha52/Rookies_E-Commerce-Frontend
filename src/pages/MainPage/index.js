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

        SpringHelper.get("products")
        .then((response) => {
            this.setState({product: response.data})
        })

        SpringHelper.get("category")
        .then(response => {
            this.setState({categories: response.data.concat([{id: 4, description: "", name:"All"}])})
        })
        
    }
    filter(e){
        e.preventDefault();
        console.log(e.target)
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
                    <Form>
                        <FormGroup row className="mt-3 mb-3">
                            <Label for="sort-type" sm={3}>Sort by:</Label>
                            <Col>
                                <Input type="select" name="sort-type" id="sort-type">
                                    <option value="none">None</option>
                                    <option value="price">Price</option>
                                    <option value="name">Name</option>
                                    <option value="rating">Rating</option>
                                    <option value="date">Added date</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row className="mt-3 mb-3">
                            <Label for="sort-order" sm={3}>Order by:</Label>
                            <Col>
                                <Input type="select" name="sort-order" id="sort-order">
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