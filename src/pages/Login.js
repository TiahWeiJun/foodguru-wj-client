import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/users";

const Login = (props) => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signIn();
  };

  const [signIn, { error }] = useMutation(LOGIN, {
    update(proxy, result) {
      props.history.push("/");
    },
    variables: formValues,
    errorPolicy: "all",
  });
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h1>Login</h1>
        <pre style={{ color: "red" }}>
          {error?.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
        </pre>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          value={formValues.username}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={formValues.password}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Log In
        </Button>
      </Form>
    </div>
  );
};

export default Login;
