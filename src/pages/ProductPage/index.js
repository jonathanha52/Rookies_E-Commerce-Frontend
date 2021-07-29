import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Input, Form } from 'reactstrap';
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
            ratingList:[],
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
        this.getAverageRating = this.getAverageRating.bind(this);
        this.comment =this.comment.bind(this);
        this.fetchAllRating = this.fetchAllRating.bind(this);
    }
    componentDidMount(){
        let id = this.props.match.params.id;
        SpringHelper.get("products/public/id="+ id)
        .then((response) => {
            this.setState({product: response.data})
        })

        this.fetchAllRating(id);
    }
    fetchAllRating(id) {
        SpringHelper.get("ratings/public/productId=" + id)
            .then((response) => {
                if (response.status == 200) {
                    this.setState({ ratingList: response.data });
                    this.getCommentFromUser();
                    this.getAverageRating();
                }
            })
            .catch(exception => {
                console.log(exception);
            });
    }

    comment(e){
        e.preventDefault();
        let data = {
            rating: this.state.ratingValue,
            userId: window.localStorage.getItem("userId"),
            productId: this.props.match.params.id,
            comment: e.target.comment.value
        }
        if(this.state.userComment != null){
            SpringHelper.put("ratings/public", data, false)
            .then(response => {
                console.log(response);
                if(response.status === 200)
                    this.setState({
                        userComment: data
                    })
            })
            .catch(exception => {
                console.log(exception);
            })
        }else{
            SpringHelper.post("ratings/public", data, false)
            .then(response => {
                console.log(response);
                if(response.status === 200)
                    this.setState({
                        userComment: data,
                        rating: this.state.rating.push(data)
                    })
            })
            .catch(exception => {
                console.log(exception);
            })
        }

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
            for(let i = 0; i < this.state.ratingList.length; i++){
                if(this.state.ratingList[i].user.userID == userId){
                    console.log(this.state.ratingList[i]);
                    this.setState({userComment: this.state.ratingList[i]});
                    break; 
                }          
            }
        }
    }
    getAverageRating(){
        let temp = 0;
        for(let i = 0; i < this.state.ratingList.length; i++){  
            temp += this.state.ratingList[i].rating;
        }
        temp = temp/this.state.ratingList.length;
        this.setState({average: temp});
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
                            <Rating ratingValue={this.state.average}></Rating>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="top-buffer">
                <h5>Product description</h5>
            </Row>
            <Row>
                <Card>
                    <CardBody>
                        <CardText>{this.state.product.productDescription}</CardText>
                    </CardBody>
                </Card>
            </Row>
            <Row>
                <h3>Edit comment</h3>
            </Row>
            <Row>
                <Card>
                    <CardBody>
                        <CardTitle>{window.localStorage.getItem("username")}</CardTitle>
                        <Rating onClick={this.handleRating} ratingValue={this.state.ratingValue}></Rating>
                        <Form onSubmit={this.comment}>
                            <Input type="textarea" id="comment" name="comment"></Input>
                            <Button>Comment</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Row>
            <Row className="top-buffer">
                <h5>Your comment</h5>
            </Row>
            {
                window.localStorage.getItem("username") ?
                (
                    this.state.userComment != null ?
                    <Row className="top-buffer">
                        <Comment rating={this.state.userComment.rating} 
                        comment={this.state.userComment.comment}
                        username={window.localStorage.getItem("username")}/>
                    </Row>
                    :
                    <Row className="top-buffer">
                        <Card>
                            <CardBody>
                                <CardText>You haven't rated this product yet.</CardText>
                            </CardBody>
                        </Card>
                    </Row>
                )
                :
                <Row>
                    <Card>
                        <CardBody>
                            <CardText>You must <Link to="/signin">log in</Link> to comment</CardText>
                        </CardBody>
                    </Card>
                </Row>
            }
            <Row className="top-buffer">
                <h5>Other's comment</h5>
            </Row>
            {
                this.state.ratingList
                .filter(e => {return e.user.userID != window.localStorage.getItem("userId")})
                .map(entry => (
                    <>
                    <Row className="top-buffer">
                        <Comment rating={entry.rating} comment={entry.comment} username={entry.user.username}/>
                    </Row>
                    </>
                ))
            }
        </Container>;
    }
}