import React from 'react';
import { Card, CardTitle, CardBody, CardText } from 'reactstrap';
export default class Comment extends React.Component{
    render(){
        return<Card className = "w-75">
            <CardBody>
                <CardTitle tag="h5">{this.props.username}</CardTitle>
                <CardBody>
                    <CardText>Rating: {this.props.rating}/5</CardText>
                    <CardText>{this.props.comment}</CardText>
                </CardBody>
                
            </CardBody>
        </Card>
    }
}