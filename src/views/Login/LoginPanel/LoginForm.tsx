import React, { useEffect, useState } from "react";
import {
  ConfigProvider,
  Form,
  Input,
  Select,
  Button,
  Checkbox,
  CheckboxProps,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";

const validatePhone = () => [
  {
    required: true,
    message: "请输入你的手机号",
  },
  {
    message: "请输入正确的手机号",
    pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g"),
  },
];
function LoginForm() {
  const [countdown, setCountdown] = useState<number>(0);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  // Form配置
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const [form] = Form.useForm();
  const { Option } = Select;
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
  const handleSubmit = async (): Promise<void> => {
    try {
      if (!isAgreed) {
        setIsModalVisible(true);
      }
      const values = await form.validateFields();
      console.log("values", values);
      navigate("..");
    } catch (_) {
      return;
    }
  };
  const agreePolicyChange: CheckboxProps["onChange"] = (e) => {
    setIsAgreed(e.target.checked);
  };
  const handleModalOk = () => {
    setIsAgreed(true);
    setIsModalVisible(false);
  };
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // 点击“发送验证码”后逻辑
  const sendVericode = () => {
    if (countdown === 0) {
      setCountdown(60);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    if (countdown === 0) {
      clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="relative h-full w-1/2 float-left">
      <div className="relative h-full px-10">
        <div className="relative w-full text-center top-1/2 -translate-y-1/2">
          <h1 className="mx-0 mt-0 p-0 text-[22px] text-primary">
            一键注册/登录xxx编辑器
          </h1>
          <span className="mt-2 mb-8 text-xs text-neutral-400">
            首次验证通过即注册xxx编辑器账号
          </span>
          <div className="w-full mt-5">
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    addonBg: "",
                    inputFontSize: 16,
                  },
                  Select: {
                    optionSelectedBg: "#f0f0f0",
                    optionSelectedColor: "#1677ff",
                    optionFontSize: 14,
                  },
                  Button: { defaultActiveBorderColor: "#ffffff" },
                },
              }}
            >
              <Form
                {...formItemLayout}
                form={form}
                name="login"
                initialValues={{ prefix: "86" }}
                scrollToFirstError
                wrapperCol={{ span: 24 }}
                className="[&_.ant-form-item-explain-error]:text-left"
              >
                <Form.Item
                  name="phone"
                  rules={[...validatePhone()]}
                  className="h-12 mb-7"
                >
                  <Input
                    addonBefore={prefixSelector}
                    placeholder="手机号"
                    className="[&>span]:h-12 [&_input]:h-12"
                  />
                </Form.Item>
                <Form.Item
                  name="verificationCode"
                  rules={[{ required: true, message: "请输入验证码" }]}
                  className="h-12 mb-7 [&_input]:h-[38px]"
                >
                  <Input
                    className="w-full"
                    suffix={
                      countdown === 0 ? (
                        <Button
                          type="link"
                          className="text-primary text-base h-9"
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
                    placeholder="短信验证码"
                    autoComplete="off"
                  />
                </Form.Item>
              </Form>
              <Button
                type="primary"
                onClick={handleSubmit}
                className="w-full h-12 text-base bg-gradient-to-r from-primary to-indigo-500"
              >
                登录/注册
              </Button>
            </ConfigProvider>
          </div>
        </div>
        <div className="relative top-1/2 -translate-y-20 px-3.5 text-center">
          <Checkbox onChange={agreePolicyChange} checked={isAgreed}></Checkbox>
          <span className="pl-1.5 text-center text-xs text-zinc-500">
            已阅读并同意xxx编辑器
            <Button
              type="link"
              className="px-0 text-xs"
              onClick={() => window.open("/user-agreement", "_blank")}
            >
              《用户协议》
            </Button>
            <Button
              type="link"
              className="px-0 text-xs"
              onClick={() => window.open("/privacy-policy", "_blank")}
            >
              《隐私政策》
            </Button>
            ，允许xxx编辑器统一管理本人账号信息
          </span>
        </div>
      </div>

      <Modal
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="同意"
        cancelText="拒绝"
        centered
        width={400}
      >
        <p className="text-zinc-600 my-3.5">
          请阅读并同意xxx编辑器
          <Button
            type="link"
            className="px-0 text-xs"
            onClick={() => window.open("/user-agreement", "_blank")}
          >
            《用户协议》
          </Button>
          <Button
            type="link"
            className="px-0 text-xs"
            onClick={() => window.open("/privacy-policy", "_blank")}
          >
            《隐私政策》
          </Button>
          ，允许xxx编辑器统一管理本人账号信息
        </p>
      </Modal>
    </div>
  );
}

export default LoginForm;
