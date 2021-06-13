import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useAuthPageContext } from "../AuthContainer";

const RegisterForm = () => {
  const [form] = Form.useForm();

  const { register } = useAuthPageContext();

  const handleRegister = async (values) => {
    if (values.password !== values.confirmPassword) {
      form.setFields([
        { name: `confirmPassword`, errors: [`Passwords do not match`] },
      ]);
      return;
    }
    const inputs = {
      username: values.username,
      password: values.password,
      email: values.email,
    };
    try {
      const response = await register({
        variables: inputs,
      });

      console.log(response);
      if (response.data.register.token) {
        localStorage.setItem("AccessToken", response.data.register.token);
        localStorage.setItem("user", JSON.stringify(response.data.register));
        const name = response.data.register.username;
        // history.push();
        window.location.replace(`/${name}/home`);
      }
    } catch (err) {
      switch (err.message) {
        case "Username is taken":
          form.setFields([{ name: `username`, errors: [err.message] }]);
          return;
        case "Email is taken":
          form.setFields([{ name: `email`, errors: [err.message] }]);
          return;
        default:
          return;
      }
    }
  };
  return (
    <Form form={form} name="normal_login" onFinish={handleRegister}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>

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

      <Form.Item
        name="confirmPassword"
        rules={[{ required: true, message: "Please input this!" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
