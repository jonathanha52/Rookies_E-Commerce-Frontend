import React from 'react';
import { Rating } from 'react-simple-star-rating';
import { Card, CardTitle, CardBody, CardText } from 'reactstrap';

export default class Comment extends React.Component{

    render(){
        return<Card>
            <CardBody>
                <CardTitle tag="h5">{this.props.username}</CardTitle>
                <CardBody>
                    <Rating ratingValue={this.props.rating}></Rating>
                    <CardText>{this.props.comment}</CardText>
                </CardBody>
            </CardBody>
        </Card>
    }
}