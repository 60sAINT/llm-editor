import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "../../utils/provider";

const fontSizeOptions = [
  {
    value: 9,
    label: 9,
  },
  {
    value: 10,
    label: 10,
  },
  {
    value: 11,
    label: 11,
  },
  {
    value: 12,
    label: 12,
  },
  {
    value: 13,
    label: 13,
  },
  {
    value: 14,
    label: 14,
  },
  {
    value: 16,
    label: 16,
  },
  {
    value: 18,
    label: 18,
  },
  {
    value: 20,
    label: 20,
  },
  {
    value: 22,
    label: 22,
  },
  {
    value: 24,
    label: 24,
  },
  {
    value: 30,
    label: 30,
  },
  {
    value: 36,
    label: 36,
  },
];
const segSpacingOptions = [
  {
    value: 1.0,
    label: 1.0,
  },
  {
    value: 1.15,
    label: 1.15,
  },
  {
    value: 1.5,
    label: 1.5,
  },
  {
    value: 2.0,
    label: 2.0,
  },
  {
    value: 2.5,
    label: 2.5,
  },
  {
    value: 3.0,
    label: 3.0,
  },
];
const paddingOptions = [
  { label: "窄", value: "narrow" },
  { label: "适中", value: "moderate" },
  { label: "宽", value: "wide" },
  { label: "自定义", value: "custom" },
];
const paddingValues: {
  [key: string]: { top: string; bottom: string; left: string; right: string };
} = {
  narrow: { top: "1.27", bottom: "1.27", left: "1.27", right: "1.27" },
  moderate: { top: "2.54", bottom: "2.54", left: "1.91", right: "1.91" },
  wide: { top: "2.54", bottom: "2.54", left: "5.08", right: "5.08" },
};

export const FormattingDoc = () => {
  const dispatch = useDispatch();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17 },
  };
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const { Option } = Select;
  const [customPadding, setCustomPadding] = useState(paddingValues.moderate);
  const [isCustom, setIsCustom] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      paddingTop: customPadding.top,
      paddingBottom: customPadding.bottom,
      paddingLeft: customPadding.left,
      paddingRight: customPadding.right,
    });
  }, [customPadding, form]);

  const handleSelectChange = (value: string) => {
    if (value === "custom") {
      setIsCustom(true);
      setCustomPadding({ top: "", bottom: "", left: "", right: "" });
    } else {
      setIsCustom(false);
      setCustomPadding(paddingValues[value]);
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setCustomPadding((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          "heading1-fontFamily": "-apple-system",
          "heading1-fontSize": 36,
          "heading2-fontFamily": "-apple-system",
          "heading2-fontSize": 24,
          "heading3-fontFamily": "-apple-system",
          "heading3-fontSize": 16,
          "paragraph-fontFamily": "-apple-system",
          "paragraph-fontSize": 12,
          segSpacing: 1.0,
          padding: "moderate",
          paddingTop: "",
          paddingLeft: "",
          paddingRight: "",
          paddingBottom: "",
        }}
        style={{ maxWidth: 600 }}
        form={form}
      >
        <Form.Item
          label="标题1"
          className="mb-3 font-semibold [&_label]:!text-base"
          colon={false}
        ></Form.Item>
        <Form.Item
          name="heading1-fontFamily"
          label="字体"
          hasFeedback
          className="mb-5"
        >
          <Select placeholder="请选择一种字体">
            <Option value="-apple-system">
              <div style={{ fontFamily: "-apple-system" }}>默认</div>
            </Option>
            <Option value="SimSun">
              <div style={{ fontFamily: "SimSun" }}>宋体</div>
            </Option>
            <Option value="SimHei">
              <div style={{ fontFamily: "SimHei" }}>黑体</div>
            </Option>
            <Option value="FangSong">
              <div style={{ fontFamily: "FangSong" }}>仿宋</div>
            </Option>
            <Option value="KaiTi">
              <div style={{ fontFamily: "KaiTi" }}>楷体</div>
            </Option>
          </Select>
        </Form.Item>
        <Form.Item name="heading1-fontSize" label="字号">
          <Select
            showSearch
            placeholder="请选择字号"
            optionFilterProp="label"
            filterSort={(optionA, optionB) => optionA.label - optionB.label}
            options={fontSizeOptions}
          />
        </Form.Item>

        <Form.Item
          label="标题2"
          className="mb-3 font-semibold [&_label]:!text-base"
          colon={false}
        ></Form.Item>
        <Form.Item
          name="heading2-fontFamily"
          label="字体"
          hasFeedback
          className="mb-5"
        >
          <Select placeholder="请选择一种字体">
            <Option value="-apple-system">
              <div style={{ fontFamily: "-apple-system" }}>默认</div>
            </Option>
            <Option value="SimSun">
              <div style={{ fontFamily: "SimSun" }}>宋体</div>
            </Option>
            <Option value="SimHei">
              <div style={{ fontFamily: "SimHei" }}>黑体</div>
            </Option>
            <Option value="FangSong">
              <div style={{ fontFamily: "FangSong" }}>仿宋</div>
            </Option>
            <Option value="KaiTi">
              <div style={{ fontFamily: "KaiTi" }}>楷体</div>
            </Option>
          </Select>
        </Form.Item>
        <Form.Item name="heading2-fontSize" label="字号">
          <Select
            showSearch
            placeholder="请选择字号"
            optionFilterProp="label"
            filterSort={(optionA, optionB) => optionA.label - optionB.label}
            options={fontSizeOptions}
          />
        </Form.Item>

        <Form.Item
          label="标题3"
          className="mb-3 font-semibold [&_label]:!text-base"
          colon={false}
        ></Form.Item>
        <Form.Item
          name="heading3-fontFamily"
          label="字体"
          hasFeedback
          className="mb-5"
        >
          <Select placeholder="请选择一种字体">
            <Option value="-apple-system">
              <div style={{ fontFamily: "-apple-system" }}>默认</div>
            </Option>
            <Option value="SimSun">
              <div style={{ fontFamily: "SimSun" }}>宋体</div>
            </Option>
            <Option value="SimHei">
              <div style={{ fontFamily: "SimHei" }}>黑体</div>
            </Option>
            <Option value="FangSong">
              <div style={{ fontFamily: "FangSong" }}>仿宋</div>
            </Option>
            <Option value="KaiTi">
              <div style={{ fontFamily: "KaiTi" }}>楷体</div>
            </Option>
          </Select>
        </Form.Item>
        <Form.Item name="heading3-fontSize" label="字号">
          <Select
            showSearch
            placeholder="请选择字号"
            optionFilterProp="label"
            filterSort={(optionA, optionB) => optionA.label - optionB.label}
            options={fontSizeOptions}
          />
        </Form.Item>

        <Form.Item
          label="正文"
          className="mb-3 font-semibold [&_label]:!text-base"
          colon={false}
        ></Form.Item>
        <Form.Item
          name="paragraph-fontFamily"
          label="字体"
          hasFeedback
          className="mb-5"
        >
          <Select placeholder="请选择一种字体">
            <Option value="-apple-system">
              <div style={{ fontFamily: "-apple-system" }}>默认</div>
            </Option>
            <Option value="SimSun">
              <div style={{ fontFamily: "SimSun" }}>宋体</div>
            </Option>
            <Option value="SimHei">
              <div style={{ fontFamily: "SimHei" }}>黑体</div>
            </Option>
            <Option value="FangSong">
              <div style={{ fontFamily: "FangSong" }}>仿宋</div>
            </Option>
            <Option value="KaiTi">
              <div style={{ fontFamily: "KaiTi" }}>楷体</div>
            </Option>
          </Select>
        </Form.Item>
        <Form.Item name="paragraph-fontSize" label="字号">
          <Select
            showSearch
            placeholder="请选择字号"
            optionFilterProp="label"
            filterSort={(optionA, optionB) => optionA.label - optionB.label}
            options={fontSizeOptions}
          />
        </Form.Item>

        <Form.Item
          label="段间距"
          className="mb-3 font-semibold [&_label]:!text-base"
          colon={false}
        ></Form.Item>
        <Form.Item
          name="segSpacing"
          hasFeedback
          wrapperCol={{ offset: 1, span: 22 }}
        >
          <Select
            placeholder="请选择段间距"
            optionFilterProp="label"
            filterSort={(optionA, optionB) => optionA.label - optionB.label}
            options={segSpacingOptions}
          />
        </Form.Item>

        <Form.Item
          label="页边距(cm)"
          className="mb-0.5 font-semibold [&_label]:!text-base overflow-visible"
          colon={false}
          labelCol={{ offset: 0, span: 24 }}
        ></Form.Item>
        <Form.Item
          name="padding"
          hasFeedback
          wrapperCol={{ offset: 1, span: 22 }}
          className="mb-5"
        >
          <Select
            placeholder="请选择段间距"
            optionFilterProp="label"
            options={paddingOptions}
            onChange={handleSelectChange}
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12} className="!pl-0">
            <Form.Item label="上" className="mb-5" name="paddingTop">
              <Input
                name="top"
                value={customPadding.top}
                onChange={handleInputChange}
                placeholder="上边距"
                disabled={!isCustom}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="!pl-0">
            <Form.Item label="下" className="mb-5" name="paddingBottom">
              <Input
                name="bottom"
                value={customPadding.bottom}
                onChange={handleInputChange}
                placeholder="下边距"
                disabled={!isCustom}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="!pl-0">
            <Form.Item label="左" className="mb-5" name="paddingLeft">
              <Input
                name="left"
                value={customPadding.left}
                onChange={handleInputChange}
                placeholder="左边距"
                disabled={!isCustom}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="!pl-0">
            <Form.Item label="右" className="mb-5" name="paddingRight">
              <Input
                name="right"
                value={customPadding.right}
                onChange={handleInputChange}
                placeholder="右边距"
                disabled={!isCustom}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Button
        type="primary"
        className="float-right mr-1.5 mb-3.5 mt-1"
        onClick={async () => {
          const fullTextFormatting = await form.validateFields();
          dispatch({
            type: "SET_FULLTEXT_FORMATTING",
            payload: fullTextFormatting,
          });
          dispatch({ type: "FORMAT_KEY_DOWN" });
        }}
      >
        确认
      </Button>
    </>
  );
};
