import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest}>
    {isAuthenticated ? <Component /> : <Redirect to="/login" />}
  </Route>
);

export default ProtectedRoute;
