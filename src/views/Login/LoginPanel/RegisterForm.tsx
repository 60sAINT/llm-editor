import { Button, Form, FormInstance, Input } from "antd";
import React, { useEffect, useState } from "react";
import { validateEmail, validatePassword, validateUsername } from "../utils";
import { useRequest } from "@/hooks/useRequest";
import { loginApi } from "../api";
import { showMessage } from "../../../common/utils/message";

interface Props {
  operation: string;
  isAgreed: boolean;
  form: FormInstance;
  openModal: () => void;
}
const RegisterForm = (props: Props) => {
  const { isAgreed, form, openModal } = props;
  const [countdown, setCountdown] = useState<number>(0);

  const { runAsync } = useRequest(async (value) => {
    const res = await loginApi.registerAuth(value);
    if (res) return showMessage("注册成功！");
  });
  const { runAsync: runSendVericode } = useRequest(async (value) => {
    await loginApi.getVericode(value);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    if (countdown === 0) {
      clearTimeout(timer);
    }
  }, [countdown]);

  // 点击“发送验证码”后逻辑
  const sendVericode = async () => {
    if (countdown === 0) {
      setCountdown(60);
    }
    const { email } = await form.getFieldsValue();
    await runSendVericode(email);
  };

  const handleRegister = async (): Promise<void> => {
    try {
      if (!isAgreed) {
        openModal();
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
      <Form.Item
        name="email"
        rules={[...validateEmail()]}
        className="h-10 mb-7"
      >
        <Input placeholder="邮箱" className="h-10" />
      </Form.Item>

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
