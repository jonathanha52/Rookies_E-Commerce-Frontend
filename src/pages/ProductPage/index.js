import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Input } from 'reactstrap';
import Comment from '../../components/Comment';
import "./productInfo.css";
import SpringHelper from '../../api/spring_api';

export default class ProductPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            product:{
                id:1,
                productName:"Test product",
                productDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consequat consequat tellus sed tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla faucibus nec ipsum ut fermentum. Maecenas sodales, tellus a iaculis commodo, ex nunc interdum tortor, at molestie nisl lorem eu tellus. Sed bibendum velit a elit ornare commodo. Suspendisse ultricies turpis id dui porttitor, eget sagittis massa bibendum. Aliquam magna lacus, tempus id ultrices id, accumsan eget metus. Nullam eget mollis ligula. Praesent tincidunt risus nec massa aliquet tincidunt. Aenean pretium ex fermentum, aliquet turpis eget, sagittis felis.",
                imgUrl:"http://via.placeholder.com/250x330.svg",
                price:100000,
                unit:"unit",
                created_by:"admin",
                category:"misc",
                created_date: new Date(),
                modified_date: new Date()
            },
            rating:[],
            quantity:1
        }
        this.currencyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'vnd',
          
            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
          });
        this.onQuantityChange = this.onQuantityChange.bind(this);
    }
    componentDidMount(){
        let id = this.props.match.params.id;
        SpringHelper.get("products/id="+ id)
        .then((response) => {
            this.setState({product: response.data})
        })
        console.log(this.props.match.params.id);
    }
    formatCurrency(currency){
        return(this.currencyFormatter.format(currency));
    }
    onQuantityChange(e){
        this.setState({quantity: e.target.value});
    }
    render(){
        return <Container className="mt-4">
            <Row>
                <Col xs="4">
                    <center>
                        <img src={this.state.product.imgUrl} alt="Failed to load"></img>
                    </center>
                </Col>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h3">{this.state.product.productName}</CardTitle>
                            <CardBody>
                                <CardTitle tag="h4">Price: {this.formatCurrency(this.state.product.price)}</CardTitle>
                            </CardBody>
                            <CardText>{this.state.product.productDescription}</CardText>
                            <CardText>Quantity</CardText>
                            <Input min="1" type="number" className="w-25" value={this.state.quantity} onChange={this.onQuantityChange}/>
                            <Button className="top-buffer">Add to card</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="top-buffer">
                <h5>Your comment</h5>
            </Row>
            <Row className="top-buffer">
                <Comment username="admin" comment="This is a test comment"/>
            </Row>
            <Row className="top-buffer">
                <h5>Other's comment</h5>
            </Row>
            <Row className="top-buffer">
                <Comment username="admin" comment="This is a test comment"/>
            </Row>
        </Container>;
    }
}
