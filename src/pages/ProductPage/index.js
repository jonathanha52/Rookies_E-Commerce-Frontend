import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Input } from 'reactstrap';
import Comment from '../../components/Comment';
import "./productInfo.css";
import SpringHelper from '../../api/spring_api';
import { Rating } from 'react-simple-star-rating';
import { Link } from 'react-router-dom';

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
            average: 0,
            ratingValue: 0,
            rating:[],
            quantity:1,
            customer:null,
            validComment: true,
            userComment: null
        }
        this.currencyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'vnd',
          
            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
          });
        this.onQuantityChange = this.onQuantityChange.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.getCommentFromUser = this.getCommentFromUser.bind(this);
    }
    componentDidMount(){
        let id = this.props.match.params.id;
        SpringHelper.get("products/public/id="+ id)
        .then((response) => {
            this.setState({product: response.data})
        })

        SpringHelper.get("ratings/public/productId="+id)
        .then((response) => {
            console.log(response);
            if(response.state === 200){
                this.setState({rating: response.data});
            }
        })
        .catch(exception => {
            console.log(exception);
        })
        this.getCommentFromUser();
    }
    formatCurrency(currency){
        return(this.currencyFormatter.format(currency));
    }
    onQuantityChange(e){
        this.setState({quantity: e.target.value});
    }
    handleRating(rate){
        this.setState({ratingValue: rate});
    }
    getCommentFromUser(){
        let userId = window.localStorage.getItem("userId");
        if(userId != null){
            for(let i = 0; i < this.state.rating.length; i++){
                if(this.state.rating[i].user.userID == userId)
                    this.setState({userComment: this.state.rating[i]});
                    return; 
            }
        }
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
                    <Card className="no-border">
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
            {this.state.userComment != null ? 
            <Row className="top-buffer">
                <Comment username="admin" comment="This is a test comment"/>
            </Row>
            :
            (window.localStorage.getItem("username") ? <Row className="top-buffer">
                <Card>
                    <CardBody>
                        <CardTitle>{window.localStorage.getItem("username")}</CardTitle>
                        <Rating onClick={this.handleRating} ratingValue={this.state.ratingValue}></Rating>
                        <Input type="textarea" id="comment" name="comment"></Input>
                    </CardBody>
                </Card>
            </Row>
            :
            <Row>
                <Card>
                    <CardBody>
                        <CardText>You must <Link to="/signin">log in</Link> to comment</CardText>
                    </CardBody>
                </Card>
            </Row>)}
            <Row className="top-buffer">
                <h5>Other's comment</h5>
            </Row>
            {
                this.state.rating.map(entry => (
                    <>
                    <Row className="top-buffer">
                        <Comment username={entry.user.username} comment={entry.comment} rating={entry.rating}/>
                    </Row>
                    </>
                ))
            }
        </Container>;
    }
}