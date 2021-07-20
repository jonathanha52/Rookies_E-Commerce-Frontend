import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class Item extends React.Component{
    constructor(props){
        super(props);
        this.cardClick = this.cardClick.bind(this);
    }
    cardClick(){
        alert("Card Clicked!");
    }
    render(){
        return<div>
            <Card onClick={this.cardClick}>
                <CardImg top src="http://via.placeholder.com/180x240.svg" alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h5">Card title</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <Button>Xem</Button>
                </CardBody>
            </Card>
        </div>;
    }
}