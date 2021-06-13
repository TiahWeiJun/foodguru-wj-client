import React from "react";
import { Route, Redirect } from "react-router-dom";
import decode from "jwt-decode";

const ProtectRoute = ({ component: Component, path, ...rest }) => {
  const token = localStorage.getItem("AccessToken");
  if (!token) {
    return <Route {...rest} render={(props) => <Redirect to="/" />} />;
  }
  const decodedToken = decode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("AccessToken");
    return <Route {...rest} render={(props) => <Redirect to="/" />} />;
  }
  const rawUser = localStorage.getItem("user");
  const user = JSON.parse(rawUser);
  const url = window.location.href;

  if (url.includes("/home")) {
    if (url.split("/")[3] !== user.username) {
      console.log("hibye");
      console.log(url.split("/"));
      return <Route {...rest} render={(props) => <Redirect to="/error" />} />;
    }
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectRoute;
