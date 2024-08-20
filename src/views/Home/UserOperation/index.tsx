import React, { useState } from "react";
import { Dropdown, MenuProps, Avatar } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useRequest } from "@/hooks/useRequest";
import { defaultApi } from "@/views/NewDoc/api";
import Icon from "@ant-design/icons/lib/components/Icon";
import { AccountInfo } from "@/common/icons";
import { Link, useNavigate } from "react-router-dom";

export const UserOperation: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const { data: userInfo } = useRequest(
    async () => {
      const res = await defaultApi.getUserInfo();
      return res;
    },
    { manual: false }
  );
  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-avatar-bg rounded-full flex items-center justify-center text-xl font-extrabold">
            {userInfo?.nickname[0]}
          </div>
          <div className="ml-3">
            <div className="font-bold">{userInfo?.nickname}</div>
            <div className="text-gray-500">{userInfo?.email}</div>
          </div>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <Link className="flex items-center" to="../account" target="_blank">
          <span className="material-icons">
            <Icon component={AccountInfo} />
          </span>
          <span className="ml-5">账号信息</span>
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <div className="flex items-center" onClick={() => navigate("../login")}>
          <span className="material-icons">
            <LogoutOutlined />
          </span>
          <span className="ml-5">退出登录</span>
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      onOpenChange={handleVisibleChange}
      open={visible}
      trigger={["click"]}
    >
      <Avatar
        icon={<UserOutlined />}
        size="small"
        className="hover:cursor-pointer"
      />
    </Dropdown>
  );
};
