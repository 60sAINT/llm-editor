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
  Segmented,
  Dropdown,
  Space,
  MenuProps,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../provider/authProvider";
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateUsername,
} from "../utils";
import { DownOutlined } from "@ant-design/icons";
import { loginApi } from "../api";
import useCustomRequest from "@/hooks/useRequest";

function LoginForm() {
  const [countdown, setCountdown] = useState<number>(0);
  const [isAgreed, setIsAgreed] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [operation, setOperation] = useState<string>("login");
  const [segmentedValue, setSegmentedValue] = useState<string>("login");
  const navigate = useNavigate();

  // 权限
  const { setToken } = useAuth();

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

  // 选择邮箱注册or手机号注册的Dropdown
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className="h-7 leading-7 text-zinc-500"
          onClick={() => {
            setSegmentedValue("register");
            setOperation("registerByPhone");
          }}
        >
          手机号注册
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="h-7 leading-7 text-zinc-500"
          onClick={() => {
            setSegmentedValue("register");
            setOperation("registerByEmail");
          }}
        >
          邮箱注册
        </div>
      ),
    },
  ];

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
  const { runAsync: login } = useCustomRequest(async (username, password) => {
    const res = await loginApi.loginAuth(username, password);
    return res;
  });
  // 点击登录/注册后的逻辑
  const handleLogin = async (): Promise<void> => {
    if (!isAgreed) {
      setIsModalVisible(true);
    } else {
      const { username, password } = await form.validateFields();
      const res = await login(username, password);
      setToken(res.access_token);
      navigate("/", { replace: true });
    }
  };
  const handleRegister = async (): Promise<void> => {
    try {
      if (!isAgreed) {
        setIsModalVisible(true);
      } else {
        const values = await form.validateFields();
        console.log("values", values);
        setToken("this is a test token");
        navigate("/", { replace: true });
        navigate("..");
      }
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
      <div className="relative h-full px-12">
        <div className="relative w-full text-center top-1/2 -translate-y-1/2">
          <h1 className="mx-0 mt-0 p-0 text-[22px] text-primary">
            一键登录/注册xxx编辑器
          </h1>
          <span className="mt-2 mb-8 text-xs text-neutral-400">
            首次验证通过即注册xxx编辑器账号
          </span>
          <div className="w-full mt-2.5">
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
                  Segmented: {
                    itemSelectedColor: "#1677ff",
                    trackPadding: 4,
                    trackBg: "#f0f0f0",
                    itemHoverColor: "#1677ff",
                  },
                },
              }}
            >
              <Segmented
                options={[
                  {
                    label: (
                      <div
                        className="h-9 leading-9"
                        onClick={() => {
                          setSegmentedValue("login");
                          setOperation("login");
                        }}
                      >
                        登录
                      </div>
                    ),
                    value: "login",
                  },
                  {
                    label: (
                      <Dropdown
                        menu={{ items }}
                        className="w-full inline-block"
                        arrow={true}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space className="h-9">
                            注册
                            <DownOutlined className="text-xs" />
                          </Space>
                        </a>
                      </Dropdown>
                    ),
                    value: "register",
                  },
                ]}
                size="large"
                block={true}
                className="h-11 mb-6 [&_.ant-segmented-item-label]:!px-0"
                value={segmentedValue}
              />
              <Form
                {...formItemLayout}
                form={form}
                name="login"
                initialValues={{ prefix: "86" }}
                scrollToFirstError
                wrapperCol={{ span: 24 }}
                className="[&_.ant-form-item-explain-error]:text-left"
              >
                {operation == "login" ? (
                  <>
                    <Form.Item
                      name="username"
                      rules={[...validateUsername()]}
                      className="h-10 mb-7"
                    >
                      <Input placeholder="昵称" className="h-10" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: "请输入密码" }]}
                      className="h-10 mb-7"
                    >
                      <Input.Password placeholder="密码" className="h-10" />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        onClick={handleLogin}
                        className="w-full h-10 text-base bg-gradient-to-r from-primary to-indigo-500"
                      >
                        登录
                      </Button>
                    </Form.Item>
                  </>
                ) : (
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
                      name="verificationCode"
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
                )}
              </Form>
            </ConfigProvider>
          </div>
        </div>
        <div className="absolute bottom-[9px] pl-3.5 pr-16 text-center leading-4">
          <Checkbox onChange={agreePolicyChange} checked={isAgreed}></Checkbox>
          <span className="pl-1.5 text-center text-xs text-zinc-500 inline">
            已阅读并同意xxx编辑器
            <Button
              type="link"
              className="p-0 text-xs inline border-none h-full"
              onClick={() => window.open("/user-agreement", "_blank")}
            >
              《用户协议》
            </Button>
            <Button
              type="link"
              className="p-0 text-xs inline border-none h-full"
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
