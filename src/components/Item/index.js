import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Item extends React.Component{

    formatCurrency(currency){
        var currencyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'vnd',
          
            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
          });
        return currencyFormatter.format(currency); 
    }
    render(){
        return<>
            <Card>
                <CardImg top src={this.props.product.imgUrl || "http://via.placeholder.com/180x240.svg"} alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h5">{this.props.product.productName}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{this.formatCurrency(this.props.product.price)}</CardSubtitle>
                    <Link to={"/product/"+this.props.product.id} className="btn btn-primary">Xem sản phẩm</Link>
                </CardBody>
            </Card>
        </>;
    }
}