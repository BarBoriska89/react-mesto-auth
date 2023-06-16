import React from 'react';
import Main from './Main';
import { Navigate, Route } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props }) => {

  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
  )
};

export default ProtectedRouteElement;