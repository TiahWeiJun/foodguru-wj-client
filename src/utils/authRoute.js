import React from "react";
import { Route, Redirect } from "react-router-dom";
import decode from "jwt-decode";

const AuthRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("AccessToken");
  if (!token) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  const decodedToken = decode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("AccessToken");
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  const rawUser = localStorage.getItem("user");
  const user = JSON.parse(rawUser);

  return (
    <Route
      {...rest}
      render={(props) => <Redirect to={`/${user.username}/home`} />}
    />
  );
};

export default AuthRoute;
