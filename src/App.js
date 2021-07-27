import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react'
import NavBar from './components/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import CustomerManage from './pages/UserManage';
import MainPage from './pages/MainPage';
import { UserContext } from './context/UserContext';
import ProductManage from './pages/ProductManage';
import CategoryManage from './pages/CategoryManage';
import AboutMe from './pages/AboutMe';
import PageNotFound from './pages/PageNotFound';
import CustomerInfoForm from './components/CustomerInfoForm';
import LoginForm from './components/LoginForm'
import { Forbidden } from './pages/Forbidden'; 
import ProtectedRoute from './hoc/ProtectedRouter';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      role: "CUSTOMER"
    }
  }
  componentDidMount(){
    this.setState({
      username: window.localStorage.getItem("username") == null ? "" : window.localStorage.getItem("username"),
      role: window.localStorage.getItem("role") == null ? "CUSTOMER" : window.localStorage.getItem("role")
    });
  }
  componentWillUnmount(){
    localStorage.removeItem("username");
    localStorage.removeItem("role");
  }
  render()
  {
    return <>
      <UserContext.Provider value={{username: this.state.username, role: this.state.role}}>
        <BrowserRouter>
            <Switch>
              <Route exact path="/signin">
                <LoginForm />
              </Route>
              <Route exact path="/signup">
                <CustomerInfoForm />
              </Route>
              <div>
              <NavBar />
              <Route exact path="/">
                <MainPage />  
              </Route>
              <Route exact path="/About">
                <AboutMe />
              </Route>
              <Route exact path="/customer/:id" component={CustomerInfoForm}/>
              <Route exact path="/product/:id" component={ProductPage}/>
              {/* <Route exact path="/admin/customers">
                <CustomerManage></CustomerManage>
              </Route>
              <Route exact path="/admin/products">
                <ProductManage></ProductManage>
              </Route>
              <Route exact path="/admin/categories">
                <CategoryManage></CategoryManage>
              </Route> */}
              <ProtectedRoute exact path="/admin/customers" component={CustomerManage} />
              <ProtectedRoute exact path="/admin/products" component={ProductManage} />
              <ProtectedRoute exact path="/admin/categories" component={CategoryManage} />
              <Route exact path="/forbidden">
                <Forbidden />
              </Route>
              <Route>
                <PageNotFound />
              </Route>
              </div>
            </Switch>
        </BrowserRouter>
      </UserContext.Provider>
  </>;
  }
}

export default App;
