import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/CustomerInfo'
import NavBar from './components/Navbar';
import Item from './components/Item';
import Comment from './components/Comment'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductInfo from './pages/ProductInfo';
import EditProduct from './pages/EditProduct';
import CustomerManage from './pages/CustomerManage';

const UserContext = React.createContext({});

function App() {
  return (
    <UserContext.Provider>
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/signin">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/About">
              <h1>About me</h1>
            </Route>
            <Route exact path="/Comment">
              <Comment username="DangKhoa" comment="Template text"></Comment>
            </Route>
            <Route exact path="/info">
              <ProductInfo></ProductInfo>
            </Route>
            <Route exact path="/edit">
              <EditProduct></EditProduct>
            </Route>
            <Route exact path="/customers">
              <CustomerManage></CustomerManage>
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
