import { Menu } from "antd";
import { useState } from "react";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";

const AuthContent = () => {
  const [current, setCurrent] = useState("login");

  return (
    <div className="flex justify-center items-center h-screen bg-orange-dark">
      <div className="w-64 md:w-96 bg-white flex justify-center rounded-lg">
        <div className="flex-col w-48 md:w-64">
          <div className="my-3 rounded-lg">
            <Menu
              onClick={(e) => setCurrent(e.key)}
              selectedKeys={[current]}
              mode="horizontal"
              className="flex justify-center"
              inlineIndent={12}
            >
              <Menu.Item key="login">Login</Menu.Item>
              <Menu.Item key="register">Register</Menu.Item>
            </Menu>
          </div>

          {current === "login" && <LoginForm />}
          {current === "register" && <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthContent;
