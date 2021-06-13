import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Spinner = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Spin indicator={antIcon} />;
      </div>
    </div>
  );
};

export default Spinner;
