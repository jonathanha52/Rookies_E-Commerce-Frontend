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
            categories: [],
            sortType: "name",
            sortOrder: "ascending",
            filterBy: "all"
        }
        this.categoryFilter = this.categoryFilter.bind(this); 
        this.sortProduct = this.sortProduct.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
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
        this.setState({
            sortType: e.target.sortType.value,
            sortOrder: e.target.sortOrder.value,
            filterBy: e.target.categories.value
        })
    }
    categoryFilter(a){
        if(this.state.filterBy.toLowerCase() === "all")
            return true;
        return a.category.name.toLowerCase() === this.state.filterBy.toLowerCase();
    }
    sortProduct(a, b, type){
        if(type === "price"){
            return this.state.sortOrder.toLowerCase() === "ascending" ? a.price - b.price : b.price - a.price;
        }else if(type === "name"){
            if(this.state.sortOrder.toLowerCase() === "ascending")  
                return a.productName < b.productName ? -1 : 1;
            else
                return a.productName > b.productName ? -1 : 1;
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
                                    <option value="price">Price</option>
                                    <option value="name">Name</option>
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
                                        <option value={entry.name.toLowerCase()}>{entry.name}</option>
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
                            this.state.product.sort((a,b) => this.sortProduct(a,b,this.state.sortType)).filter((a) => this.categoryFilter(a, this.state.filterBy)).map(entry => (
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