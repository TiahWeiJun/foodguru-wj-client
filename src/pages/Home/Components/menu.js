import React from "react";
import { Menu, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useHomePageContext } from "../HomeContainer";

const DropdownMenu = ({ user }) => {
  const { logOut } = useHomePageContext();
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <div class="flex items-center">
          <img
            class="ui avatar image w-8"
            src="https://www.csrhymes.com/img/avatar.png"
            alt="hi"
          />{" "}
          <div class="ml-2">{user?.username}</div>
        </div>
      </Menu.Item>

      <Menu.Item key="2">Add Post</Menu.Item>

      <Menu.Item key="3">
        <span
          className="text-black cursor-pointer hover:text-orange"
          onClick={() => {
            logOut();
          }}
        >
          Log Out
        </span>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown
      className="pointer-cursor lg:hidden block"
      overlay={menu}
      trigger={["click"]}
    >
      <a
        href="/"
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
      >
        <MenuOutlined style={{ color: "black" }} className="text-xl" />
      </a>
    </Dropdown>
  );
};

export default DropdownMenu;
