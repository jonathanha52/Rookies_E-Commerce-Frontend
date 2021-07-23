import React from 'react';
import { Table, Button }  from 'reactstrap';
import { Link } from 'react-router-dom';
import SpringHelper from '../../api/spring_api';

export default class ProductManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            productList:[]
        }
    }
    componentDidMount(){
        SpringHelper.get("products")
        .then(response => {
            this.setState({productList: response.data})
        })
    }
    render(){
        return <>
            <Table bordered small hover className="mt-4">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Unit</th>
                    <th>Img</th>
                    <th>Created date</th>
                    <th>Updated date</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.productList.map(entry => (
                            <tr>
                                <th scope="row">{entry.id}</th>
                                <td>{entry.productName}</td>
                                <td>{entry.productDescription}</td>
                                <td>{entry.category.name}</td>
                                <td>{entry.price}</td>
                                <td>{entry.unit}</td>
                                <td><img src={entry.imgUrl} alt="Deleted or wrong url"></img></td>
                                <td>{entry.createdDate}</td>
                                <td>{entry.updatedDate}</td>
                                <td><Button color="danger">Delete</Button></td>
                                <td><Link to="/mark" className="btn btn-primary">Edit</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
                </Table>
        </>;
    }
}