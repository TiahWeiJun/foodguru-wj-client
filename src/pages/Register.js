import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../graphql/users";

const Register = (props) => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const [addUser, { error }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
      props.history.push("/");
    },
    variables: formValues,
    errorPolicy: "all",
  });

  if (error) {
    console.log(error.graphQLErrors);
  }

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  };
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          value={formValues.email}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmedPassword"
          type="password"
          value={formValues.confirmedPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
