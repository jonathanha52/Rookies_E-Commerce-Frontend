import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react'
import Login from './pages/Login';
import SignUp from './pages/CustomerInfo'
import NavBar from './components/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import EditProduct from './pages/ProductInfo';
import CustomerManage from './pages/CustomerManage';
import MainPage from './pages/MainPage';
import { UserContext } from './context/UserContext';
import ProductManage from './pages/ProductManage';

function App() {
  return (
    <UserContext.Provider value={{username: "dangkhoa"}}>
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <MainPage />  
            </Route>
            <Route exact path="/signin">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/About">
              <center>
                <h1>About me</h1>
              </center>
            </Route>
            <Route path="/product/:id" component={ProductPage}/>
            <Route exact path="/edit">
              <EditProduct></EditProduct>
            </Route>
            <Route exact path="/admin/customers">
              <CustomerManage></CustomerManage>
            </Route>
            <Route exact path="/admin/products">
              <ProductManage></ProductManage>
            </Route>
            <Route>
              <center>
                <h1>ERROR 404: PAGE NOT FOUND</h1>
              </center>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
