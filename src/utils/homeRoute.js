import React from "react";
import { Route, Redirect } from "react-router-dom";
import decode from "jwt-decode";

const HomeRoute = ({ component: Component, ...rest }) => {
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
  console.log("hih");
  console.log(user);

  return (
    <Route
      {...rest}
      render={(props) => <Redirect to={`/${user.username}/home`} />}
    />
  );
};

export default HomeRoute;
