import { Button, Form, FormInstance, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateUsername,
} from "../utils";
import { useRequest } from "@/hooks/useRequest";
import { loginApi } from "../api";
import { showMessage } from "../utils/message";

const { Option } = Select;

interface Props {
  operation: string;
  isAgreed: boolean;
  form: FormInstance;
  openIs: () => void;
}
const RegisterForm = (props: Props) => {
  const { operation, isAgreed, form, openIs } = props;
  const [countdown, setCountdown] = useState<number>(0);

  const { runAsync } = useRequest(async (value) => {
    const res = await loginApi.registerAuth(value);
    if (res) return showMessage("注册成功！");
  });

  // 手机号归属地选择框
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        popupMatchSelectWidth={false}
        className="w-20 [&_.ant-select-selection-item]:text-base"
      >
        <Option value="86" className="w-44">
          +86
        </Option>
        <Option value="non-chinese-mainland">非中国大陆手机号</Option>
      </Select>
    </Form.Item>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    if (countdown === 0) {
      clearTimeout(timer);
    }
  }, [countdown]);

  // 点击“发送验证码”后逻辑
  const sendVericode = () => {
    if (countdown === 0) {
      setCountdown(60);
    }
  };

  const handleRegister = async (): Promise<void> => {
    try {
      if (!isAgreed) {
        openIs();
      } else {
        const values = await form.validateFields();
        await runAsync(values);
      }
    } catch (_) {
      return;
    }
  };
  return (
    <>
      {operation == "registerByPhone" ? (
        <Form.Item
          name="phone"
          rules={[...validatePhone()]}
          className="h-10 mb-7"
        >
          <Input
            addonBefore={prefixSelector}
            placeholder="手机号"
            className="[&>span]:h-10 [&_input]:h-10"
          />
        </Form.Item>
      ) : (
        <Form.Item
          name="email"
          rules={[...validateEmail()]}
          className="h-10 mb-7"
        >
          <Input placeholder="邮箱" className="h-10" />
        </Form.Item>
      )}

      <Form.Item
        name="vericode"
        rules={[{ required: true, message: "请输入验证码" }]}
        className="h-10 mb-7 [&_input]:h-[30px]"
      >
        <Input
          className="w-full"
          suffix={
            countdown === 0 ? (
              <Button
                type="link"
                className="text-primary text-base h-7"
                onClick={sendVericode}
              >
                发送验证码
              </Button>
            ) : (
              <Button
                type="link"
                disabled
                style={{ fontSize: "16px" }}
              >{`已发送${countdown}s`}</Button>
            )
          }
          placeholder="验证码"
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        name="nickname"
        rules={[...validateUsername()]}
        className="h-10 mb-7"
      >
        <Input placeholder="设置昵称" className="h-10" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[...validatePassword()]}
        className="h-10 mb-7"
      >
        <Input.Password placeholder="设置密码" className="h-10" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          onClick={handleRegister}
          className="w-full h-10 text-base bg-gradient-to-r from-primary to-indigo-500"
        >
          注册
        </Button>
      </Form.Item>
    </>
  );
};

export default RegisterForm;
