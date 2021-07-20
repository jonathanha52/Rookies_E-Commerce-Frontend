import React from 'react';
import { Table, Button }  from 'reactstrap';
import { Link } from 'react-router-dom';

export default class ProductManage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            productList:[]
        }
    }

    render(){
        return <>
            <Table bordered small hover className="mt-4">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr onClick={() => alert("Clicked")}> 
                        <th scope="row">1</th>
                        <td><a href="/mark">Mark</a></td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td><Button color="danger">Delete</Button></td>
                        <td><Link to="/mark" className="btn btn-primary">Edit</Link></td>
                    </tr>
                    <tr onClick={() => alert("Clicked")}>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td><Button color="danger">Delete</Button></td>
                        <td><Link to="/mark" className="btn btn-primary">Edit</Link></td>
                    </tr>
                    <tr onClick={() => alert("Clicked")}>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        <td><Button color="danger">Delete</Button></td>
                        <td><Link to="/mark" className="btn btn-primary">Edit</Link></td>
                    </tr>
                </tbody>
                </Table>
        </>;
    }
}