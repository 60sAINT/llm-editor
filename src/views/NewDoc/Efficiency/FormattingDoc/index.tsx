import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "../../utils/provider";
import {
  dataSource,
  fontSizeOptions,
  paddingOptions,
  paddingValues,
  segSpacingOptions,
} from "../../model";

export const FormattingDoc = () => {
  const dispatch = useDispatch();
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
    <div className="pl-4">
      <Form
        name="validate_other"
        // {...formItemLayout}
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
          "segSpacing-before-heading1": 1,
          "segSpacing-after-heading1": 1,
          "segSpacing-before-heading2": 1,
          "segSpacing-after-heading2": 1,
          "segSpacing-before-heading3": 1,
          "segSpacing-after-heading3": 1,
          "segSpacing-before-paragraph": 1,
          "segSpacing-after-paragraph": 1,
        }}
        style={{ maxWidth: 600 }}
        form={form}
        colon={false}
      >
        <div className="font-semibold mb-4">文字样式</div>
        <div className="flex justify-stretch items-center mb-3">
          <div className="mr-3.5">一级标题</div>
          <Form.Item
            name="heading1-fontFamily"
            hasFeedback
            className="mb-0 mr-3.5 w-1/3"
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
          <Form.Item name="heading1-fontSize" className="mb-0 w-1/3">
            <Select
              showSearch
              placeholder="请选择字号"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA.value as number) - (optionB.value as number)
              }
              options={fontSizeOptions}
            />
          </Form.Item>
        </div>
        <div className="flex justify-stretch items-center mb-3">
          <div className="mr-3.5">二级标题</div>
          <Form.Item
            name="heading2-fontFamily"
            hasFeedback
            className="mb-0 mr-3.5 w-1/3"
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
          <Form.Item name="heading2-fontSize" className="mb-0 w-1/3">
            <Select
              showSearch
              placeholder="请选择字号"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA.value as number) - (optionB.value as number)
              }
              options={fontSizeOptions}
            />
          </Form.Item>
        </div>
        <div className="flex justify-stretch items-center mb-3">
          <div className="mr-3.5">三级标题</div>
          <Form.Item
            name="heading3-fontFamily"
            hasFeedback
            className="mb-0 mr-3.5 w-1/3"
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
          <Form.Item name="heading3-fontSize" className="mb-0 w-1/3">
            <Select
              showSearch
              placeholder="请选择字号"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA.value as number) - (optionB.value as number)
              }
              options={fontSizeOptions}
            />
          </Form.Item>
        </div>
        <div className="flex justify-stretch items-center mb-5">
          <div className="mr-[42px]">正文</div>
          <Form.Item
            name="paragraph-fontFamily"
            hasFeedback
            className="mb-0 w-1/3 mr-3.5"
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
          <Form.Item name="paragraph-fontSize" className="w-1/3 mb-0">
            <Select
              showSearch
              placeholder="请选择字号"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA.value as number) - (optionB.value as number)
              }
              options={fontSizeOptions}
            />
          </Form.Item>
        </div>
        <div className="font-semibold mb-4">段间距</div>
        <Form.Item
          name="segSpacing"
          className="mb-5"
          hasFeedback
          wrapperCol={{ offset: 1, span: 23 }}
        >
          <Table
            pagination={false}
            dataSource={dataSource}
            className="[&_.ant-table-cell]:!px-0 [&_.ant-table-cell]:!py-2 [&_th]:!font-medium"
            size="middle"
            columns={[
              {
                title: "",
                align: "center",
                dataIndex: "position",
                key: "position",
                render: (text) => <>{text}</>,
                width: "10%",
              },
              {
                title: "标题1",
                align: "center",
                dataIndex: "heading1",
                key: "heading1",
                render: (position) => (
                  <Form.Item
                    name={`segSpacing-${position}-heading1`}
                    className="mb-0"
                  >
                    <Select
                      options={segSpacingOptions}
                      variant="borderless"
                      className="w-full text-center [&>.ant-select-selector]:!px-0 [&_.ant-select-selection-item]:!pr-0 [&>.ant-select-arrow]:right-1.5"
                    />
                  </Form.Item>
                ),
                width: "22.5%",
              },
              {
                title: "标题2",
                align: "center",
                dataIndex: "heading2",
                key: "heading2",
                render: (position) => (
                  <Form.Item
                    name={`segSpacing-${position}-heading2`}
                    className="mb-0"
                  >
                    <Select
                      options={segSpacingOptions}
                      variant="borderless"
                      className="w-full text-center [&>.ant-select-selector]:!px-0 [&_.ant-select-selection-item]:!pr-0 [&>.ant-select-arrow]:right-1.5"
                    />
                  </Form.Item>
                ),
                width: "22.5%",
              },
              {
                title: "标题3",
                align: "center",
                dataIndex: "heading3",
                key: "heading3",
                render: (position) => (
                  <Form.Item
                    name={`segSpacing-${position}-heading3`}
                    className="mb-0"
                  >
                    <Select
                      options={segSpacingOptions}
                      variant="borderless"
                      className="w-full text-center [&>.ant-select-selector]:!px-0 [&_.ant-select-selection-item]:!pr-0 [&>.ant-select-arrow]:right-1.5"
                    />
                  </Form.Item>
                ),
                width: "22.5%",
              },
              {
                title: "段落",
                align: "center",
                dataIndex: "paragraph",
                key: "paragraph",
                render: (position) => (
                  <Form.Item
                    name={`segSpacing-${position}-paragraph`}
                    className="mb-0"
                  >
                    <Select
                      options={segSpacingOptions}
                      variant="borderless"
                      className="w-full text-center [&>.ant-select-selector]:!px-0 [&_.ant-select-selection-item]:!pr-0 [&>.ant-select-arrow]:right-1.5"
                    />
                  </Form.Item>
                ),
                width: "22.5%",
              },
            ]}
          />
        </Form.Item>
        <div className="font-semibold mb-4">页边距(cm)</div>
        <Form.Item name="padding" hasFeedback className="mb-5">
          <Select
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
    </div>
  );
};
