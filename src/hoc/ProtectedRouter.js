import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if(window.localStorage.getItem("role") === "ADMIN"){
          return <Component {...rest} {...props}/>
        }else{
          return <Redirect to={
            {
              pathname: "/forbidden",
              state: {
                from: props.location
            }}
          }
          />
        }
      } 
    } />
  )
}

export default ProtectedRoute;