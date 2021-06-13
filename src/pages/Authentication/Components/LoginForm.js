import React from "react";
import { Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useAuthPageContext } from "../AuthContainer";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const [form] = Form.useForm();

  const { login } = useAuthPageContext();

  const history = useHistory();

  const handleLogIn = async (values) => {
    try {
      const response = await login({
        variables: values,
      });
      console.log(response);
      if (response.data.login.token) {
        localStorage.setItem("AccessToken", response.data.login.token);
        localStorage.setItem("user", JSON.stringify(response.data.login));
        const name = response.data.login.username;
        history.push(`/${name}/home`);
      }
    } catch (err) {
      console.log(err);
      switch (err.message) {
        case "Email not found":
          form.setFields([{ name: `email`, errors: [err.message] }]);
          return;
        case "Incorrect password":
          form.setFields([{ name: `password`, errors: [err.message] }]);
          return;
        default:
          return;
      }
    }
  };

  return (
    <Form form={form} name="normal_login" onFinish={handleLogIn}>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: `email`, message: `Invalid email.` },
        ]}
      >
        <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
