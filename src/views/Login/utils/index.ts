import { Rule } from "antd/es/form";

export const validatePhone = () => [
  {
    required: true,
    message: "请输入你的手机号",
  },
  {
    message: "请输入正确的手机号",
    pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g"),
  },
];

export const validateUsername = () => {
  return [
    { required: true, message: "请输入昵称" },
    { min: 3, message: "用户名至少3个字符" },
    { max: 20, message: "用户名不能超过20个字符" },
    // ... 其他规则 ...
  ];
};

export const validateEmail = () => {
  return [
    { required: true, message: "请输入邮箱地址" },
    { type: "email", message: "请输入有效的邮箱地址" },
    { max: 50, message: "邮箱地址不能超过50个字符" },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "请输入有效的邮箱格式",
    },
    // ... 其他规则 ...
  ] as Rule[];
};

export const validatePassword = () => {
  return [
    { required: true, message: "请输入密码" },
    { min: 6, message: "密码长度不能少于6个字符" },
    { max: 20, message: "密码长度不能超过20个字符" },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      message: "密码必须包含至少一个小写字母、一个大写字母和一个数字",
    },
    // ... 其他规则 ...
  ];
};
