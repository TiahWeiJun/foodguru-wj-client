import React, { createContext, useContext } from "react";
import { LOGIN, REGISTER_USER } from "../../graphql/users";
import { useMutation } from "@apollo/client";

export const AuthPageContext = createContext({});

export const useAuthPageContext = () => useContext(AuthPageContext);

export const AuthContainer = ({ children }) => {
  const [login] = useMutation(LOGIN);
  const [register] = useMutation(REGISTER_USER);

  return (
    <AuthPageContext.Provider value={{ login, register }}>
      {children}
    </AuthPageContext.Provider>
  );
};
