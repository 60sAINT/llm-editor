import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { defaultApi } from "./NewDoc/api";
import { useRequest } from "@/hooks/useRequest";
import { Button, Modal } from "antd";
import { Upgrade } from "./Home/Upgrade";

const Account = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [modalUpgradeOpen, setModalUpgradeOpen] = useState(false);

  const handleLogout = () => {
    setToken(null);
    navigate("../login", { replace: true });
  };

  const { data: userInfo } = useRequest(
    async () => {
      const res = await defaultApi.getUserInfo();
      return res;
    },
    { manual: false }
  );

  return (
    <div className="py-6 px-24">
      <h2 className="text-2xl font-bold mb-6 text-topbar-text">账号信息</h2>

      <div className="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4">
        <div className="flex items-center mb-4">
          <span className="block text-stone-500 w-32">头像</span>
          <div className="w-10 h-10 bg-avatar-bg rounded-full flex items-center justify-center text-xl font-extrabold">
            {userInfo?.nickname[0]}
          </div>
        </div>
        <div className="flex items-center mb-4 h-10">
          <span className="block text-stone-500 w-32">昵称</span>
          <span className="mr-auto text-gray-800">{userInfo?.nickname}</span>
          <button className="text-primary hover:text-[#cb7581]">
            修改昵称
          </button>
        </div>
        <div className="flex items-center mb-4 h-10">
          <span className="block text-stone-500 w-32">手机号码</span>
          <span className="mr-auto text-gray-800">{userInfo?.phone}</span>
          <button className="text-primary hover:text-[#cb7581]">
            修改手机
          </button>
        </div>
        <div className="flex items-center mb-4 h-10">
          <span className="block text-stone-500 w-32">电子邮箱</span>
          <span className="mr-auto text-gray-800">{userInfo?.email}</span>
        </div>
        <div className="flex items-center mb-4 h-10">
          <span className="block text-stone-500 w-32">账号类型</span>
          <span className="mr-auto text-gray-800">免费版</span>
          <button
            className="text-primary hover:text-[#cb7581]"
            onClick={() => setModalUpgradeOpen(true)}
          >
            账户升级
          </button>
        </div>
      </div>

      <Button onClick={handleLogout} type="primary" size="large">
        退出登录
      </Button>
      <Modal
        centered
        open={modalUpgradeOpen}
        onOk={() => setModalUpgradeOpen(false)}
        onCancel={() => setModalUpgradeOpen(false)}
        className="[&_.ant-modal-footer]:hidden [&_.ant-modal-content]:h-[550px] [&_.ant-modal-content]:p-0 [&_.ant-modal-body]:h-full !w-auto"
      >
        <Upgrade />
      </Modal>
    </div>
  );
};

export default Account;
