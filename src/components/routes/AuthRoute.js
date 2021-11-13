import React from "react";
import { useCookies } from 'react-cookie';
import { Redirect, Route } from "react-router";

const AuthRoute = props => {
  const { type } = props;
  const [cookies] = useCookies();
  const isAuthUser = Boolean(cookies.bearer);

  if (type === "guest" && isAuthUser) return <Redirect to="/devices" />;
  else if (type === "private" && !isAuthUser) return <Redirect to="/login" />;

  return <Route {...props} />;
};

export default AuthRoute